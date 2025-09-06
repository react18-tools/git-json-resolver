/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import { Conflict, MergeContext, mergeObject, BuiltInStrategies, statusToString } from "./merger";
import { DROP } from "./utils";

// Mock logger
const mockLogger = {
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  flush: vi.fn(),
};

// Mock resolveStrategies so we control strategy order
vi.mock("./strategy-resolver", () => ({
  resolveStrategies: vi.fn(() => ["ours", "theirs", "merge"]),
}));
import { resolveStrategies } from "./strategy-resolver";
import {
  StrategyStatus_OK,
  StrategyStatus_CONTINUE,
  StrategyStatus_FAIL,
  StrategyStatus_SKIP,
} from "./utils";

const makeCtx = (): MergeContext => ({
  config: { debug: false } as any,
  strategies: {},
  _strategyCache: new Map(),
});

describe("statusToString", () => {
  it("maps known statuses", () => {
    expect(statusToString(StrategyStatus_OK)).toBe("OK");
    expect(statusToString(StrategyStatus_CONTINUE)).toBe("CONTINUE");
    expect(statusToString(StrategyStatus_FAIL)).toBe("FAIL");
    expect(statusToString(StrategyStatus_SKIP)).toBe("SKIP");
    // @ts-expect-error -- testing
    expect(statusToString(999)).toMatch(/UNKNOWN/);
  });
});

describe("BuiltInStrategies", () => {
  const ctx = makeCtx();
  const args = {
    ours: 1,
    theirs: 2,
    base: 0,
    path: "x",
    ctx,
    conflicts: [] as Conflict[],
    logger: mockLogger,
  };

  it("ours returns ours", () => {
    const r = BuiltInStrategies.ours(args);
    expect(r).toEqual({ status: StrategyStatus_OK, value: 1 });
  });

  it("theirs returns theirs", () => {
    const r = BuiltInStrategies.theirs(args);
    expect(r).toEqual({ status: StrategyStatus_OK, value: 2 });
  });

  it("base returns base", () => {
    const r = BuiltInStrategies.base(args);
    expect(r).toEqual({ status: StrategyStatus_OK, value: 0 });
  });

  it("drop returns DROP symbol", () => {
    const r = BuiltInStrategies.drop(args);
    // @ts-expect-error -- will fix later
    expect(r.value).toBe(DROP);
  });

  it("skip returns SKIP", () => {
    const r = BuiltInStrategies.skip(args);
    expect(r.status).toBe(StrategyStatus_SKIP);
    // @ts-expect-error -- will fix later
    expect(r.reason).toMatch(/Skip/);
  });

  it("non-empty prefers ours → theirs → base", () => {
    // @ts-expect-error -- will fix later
    expect(BuiltInStrategies["non-empty"]({ ...args, ours: "ours" }).value).toBe("ours");
    // @ts-expect-error -- will fix later
    expect(BuiltInStrategies["non-empty"]({ ...args, ours: "", theirs: "theirs" }).value).toBe(
      "theirs",
    );
    expect(
      // @ts-expect-error -- will fix later
      BuiltInStrategies["non-empty"]({ ...args, ours: "", theirs: "", base: "base" }).value,
    ).toBe("base");
    expect(BuiltInStrategies["non-empty"]({ ...args, ours: "", theirs: "", base: "" }).status).toBe(
      StrategyStatus_CONTINUE,
    );
  });

  it("update keeps theirs if ours defined", () => {
    // @ts-expect-error -- will fix later
    expect(BuiltInStrategies.update({ ...args, ours: "x", theirs: "y" }).value).toBe("y");
  });

  it("update drops if ours undefined", () => {
    // @ts-expect-error -- will fix later
    expect(BuiltInStrategies.update({ ...args, ours: undefined, theirs: "y" }).value).toBe(DROP);
  });

  it("concat arrays", () => {
    const r = BuiltInStrategies.concat({ ...args, ours: [1], theirs: [2] });
    expect(r).toEqual({ status: StrategyStatus_OK, value: [1, 2] });
  });

  it("concat non-arrays → CONTINUE", () => {
    const r = BuiltInStrategies.concat({ ...args, ours: "a", theirs: "b" });
    expect(r.status).toBe(StrategyStatus_CONTINUE);
  });

  it("unique arrays", () => {
    const r = BuiltInStrategies.unique({ ...args, ours: [1, 2], theirs: [2, 3] });
    expect(r).toEqual({ status: StrategyStatus_OK, value: [1, 2, 3] });
  });

  it("unique non-arrays → CONTINUE", () => {
    const r = BuiltInStrategies.unique({ ...args, ours: "a", theirs: "b" });
    expect(r.status).toBe(StrategyStatus_CONTINUE);
  });

  it("merge plain objects recurses", async () => {
    const objArgs = {
      ...args,
      ours: { a: 1 },
      theirs: { a: 2 },
      base: { a: 0 },
      path: "obj",
      logger: mockLogger,
    };
    const r = await BuiltInStrategies.merge(objArgs);
    expect(r.status).toBe(StrategyStatus_OK);
    // @ts-expect-error -- will fix later
    expect(r.value).toEqual({ a: 1 });
  });

  it("merge unmergeable types → CONTINUE", async () => {
    const r = await BuiltInStrategies.merge({ ...args, ours: 1, theirs: "str" });
    expect(r.status).toBe(StrategyStatus_CONTINUE);
  });
});

describe("mergeObject", () => {
  it("returns ours if equal", async () => {
    const ctx = makeCtx();
    const conflicts: Conflict[] = [];
    const v = await mergeObject({
      ours: 1,
      theirs: 1,
      base: 0,
      path: "x",
      ctx,
      conflicts,
      logger: mockLogger,
    });
    expect(v).toBe(1);
    expect(conflicts).toHaveLength(0);
  });

  it("applies strategy OK result", async () => {
    (resolveStrategies as any).mockReturnValueOnce(["theirs"]);
    const ctx = makeCtx();
    const conflicts: Conflict[] = [];
    const v = await mergeObject({
      ours: 1,
      theirs: 2,
      path: "p",
      ctx,
      conflicts,
      logger: mockLogger,
    });
    expect(v).toBe(2);
  });

  it("records SKIP as conflict", async () => {
    (resolveStrategies as any).mockReturnValueOnce(["skip"]);
    const ctx = makeCtx();
    const conflicts: Conflict[] = [];
    const v = await mergeObject({
      ours: "a",
      theirs: "b",
      path: "p",
      ctx,
      conflicts,
      logger: mockLogger,
    });
    expect(v).toBeUndefined();
    expect(conflicts[0].reason).toMatch(/Skip/);
  });

  it("adds conflict if all CONTINUE", async () => {
    (resolveStrategies as any).mockReturnValueOnce(["concat"]);
    const ctx = makeCtx();
    const conflicts: Conflict[] = [];
    const v = await mergeObject({
      ours: "a",
      theirs: "b",
      base: "",
      path: "p",
      ctx,
      conflicts,
      logger: mockLogger,
    });
    expect(v).toBeUndefined();
    expect(conflicts[0]).toMatchObject({
      path: "p",
      reason: expect.stringContaining("All strategies failed"),
    });
  });

  it("uses custom strategy from ctx.strategies", async () => {
    (resolveStrategies as any).mockReturnValueOnce(["custom"]);
    const ctx = makeCtx();
    ctx.strategies.custom = vi.fn(() => ({ status: StrategyStatus_OK, value: "custom-result" }));
    const conflicts: Conflict[] = [];
    const v = await mergeObject({
      ours: "a",
      theirs: "b",
      path: "p",
      ctx,
      conflicts,
      logger: mockLogger,
    });
    expect(v).toBe("custom-result");
    expect(ctx.strategies.custom).toHaveBeenCalled();
  });

  it("throws on FAIL status", async () => {
    (resolveStrategies as any).mockReturnValueOnce(["fail-strategy"]);
    const ctx = makeCtx();
    ctx.strategies["fail-strategy"] = vi.fn(() => ({
      status: StrategyStatus_FAIL,
      reason: "test fail",
    }));
    const conflicts: Conflict[] = [];
    await expect(
      mergeObject({
        ours: "a",
        theirs: "b",
        path: "p",
        ctx,
        conflicts,
        logger: mockLogger,
      }),
    ).rejects.toThrow("Merge failed at p: test fail");
    expect(conflicts[0].reason).toBe("test fail");
  });

  it("enriches conflict with debug info when debug enabled", async () => {
    (resolveStrategies as any).mockReturnValueOnce(["concat"]);
    const ctx = makeCtx();
    ctx.config.debug = true;
    const conflicts: Conflict[] = [];
    await mergeObject({
      ours: "a",
      theirs: "b",
      base: "c",
      path: "p",
      ctx,
      conflicts,
      logger: mockLogger,
    });
    expect(conflicts[0]).toMatchObject({
      path: "p",
      ours: "a",
      theirs: "b",
      base: "c",
    });
  });
});
