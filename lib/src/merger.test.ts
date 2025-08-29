import { describe, it, expect, vi } from "vitest";
import {
  DROP,
  Conflict,
  MergeContext,
  mergeObject,
  BuiltInStrategies,
  statusToString,
} from "./merger";

// Mock resolveStrategies so we control strategy order
vi.mock("./strategy-resolver", () => ({
  resolveStrategies: vi.fn(() => ["ours", "theirs", "merge"]),
}));
import { resolveStrategies } from "./strategy-resolver";
import { StrategyStatus } from "./types";

const makeCtx = (): MergeContext => ({
  config: { debug: false } as any,
  strategies: {},
  _strategyCache: new Map(),
});

describe("statusToString", () => {
  it("maps known statuses", () => {
    expect(statusToString(StrategyStatus.OK)).toBe("OK");
    expect(statusToString(StrategyStatus.CONTINUE)).toBe("CONTINUE");
    expect(statusToString(StrategyStatus.FAIL)).toBe("FAIL");
    expect(statusToString(StrategyStatus.SKIP)).toBe("SKIP");
    // @ts-expect-error -- testing
    expect(statusToString(999)).toMatch(/UNKNOWN/);
  });
});

describe("BuiltInStrategies", () => {
  const ctx = makeCtx();
  const args = { ours: 1, theirs: 2, base: 0, path: "x", ctx, conflicts: [] as Conflict[] };

  it("ours returns ours", () => {
    const r = BuiltInStrategies.ours(args);
    expect(r).toEqual({ status: StrategyStatus.OK, value: 1 });
  });

  it("theirs returns theirs", () => {
    const r = BuiltInStrategies.theirs(args);
    expect(r).toEqual({ status: StrategyStatus.OK, value: 2 });
  });

  it("base returns base", () => {
    const r = BuiltInStrategies.base(args);
    expect(r).toEqual({ status: StrategyStatus.OK, value: 0 });
  });

  it("drop returns DROP symbol", () => {
    const r = BuiltInStrategies.drop(args);
    // @ts-expect-error -- will fix later
    expect(r.value).toBe(DROP);
  });

  it("skip returns SKIP", () => {
    const r = BuiltInStrategies.skip(args);
    expect(r.status).toBe(StrategyStatus.SKIP);
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
      StrategyStatus.CONTINUE,
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

  it("merge plain objects recurses", async () => {
    const objArgs = {
      ...args,
      ours: { a: 1 },
      theirs: { a: 2 },
      base: { a: 0 },
      path: "obj",
    };
    const r = await BuiltInStrategies.merge(objArgs);
    expect(r.status).toBe(StrategyStatus.OK);
    // @ts-expect-error -- will fix later
    expect(r.value).toEqual({ a: 1 });
  });

  it("merge unmergeable types → CONTINUE", async () => {
    const r = await BuiltInStrategies.merge({ ...args, ours: 1, theirs: "str" });
    expect(r.status).toBe(StrategyStatus.CONTINUE);
  });
});

describe("mergeObject", () => {
  it("returns ours if equal", async () => {
    const ctx = makeCtx();
    const conflicts: Conflict[] = [];
    const v = await mergeObject({ ours: 1, theirs: 1, base: 0, path: "x", ctx, conflicts });
    expect(v).toBe(1);
    expect(conflicts).toHaveLength(0);
  });

  it("applies strategy OK result", async () => {
    (resolveStrategies as any).mockReturnValueOnce(["theirs"]);
    const ctx = makeCtx();
    const conflicts: Conflict[] = [];
    const v = await mergeObject({ ours: 1, theirs: 2, path: "p", ctx, conflicts });
    expect(v).toBe(2);
  });

  it("records SKIP as conflict", async () => {
    (resolveStrategies as any).mockReturnValueOnce(["skip"]);
    const ctx = makeCtx();
    const conflicts: Conflict[] = [];
    const v = await mergeObject({ ours: "a", theirs: "b", path: "p", ctx, conflicts });
    expect(v).toBeUndefined();
    expect(conflicts[0].reason).toMatch(/Skip/);
  });

  it.skip("adds conflict if all CONTINUE", async () => {
    (resolveStrategies as any).mockReturnValueOnce(["non-empty"]);
    const ctx = makeCtx();
    const conflicts: Conflict[] = [];
    const v = await mergeObject({ ours: "", theirs: "", base: "", path: "p", ctx, conflicts });
    expect(v).toBeUndefined();
    expect(conflicts[0]).toMatchObject({
      path: "p",
      reason: expect.stringContaining("All strategies failed"),
    });
  });
});
