import { describe, expect, it, vi } from "vitest";
import { reconstructConflict } from "./conflict-helper";
import { DROP } from "./utils";

// Mock serializer to keep things deterministic
vi.mock("./file-serializer", () => ({
  serialize: async (_format: string, obj: any) => JSON.stringify(obj, null, 2),
}));

describe("preprocessForConflicts + reconstructConflict", () => {
  it("removes DROP keys", async () => {
    const merged = { a: 1, b: DROP };
    const ours = { a: 1 };
    const theirs = { a: 1 };
    const out = await reconstructConflict(merged, ours, theirs, "json");
    expect(out).not.toContain("b");
  });

  it("marks undefined fields as conflicts", async () => {
    const merged = { a: undefined };
    const ours = { a: 1 };
    const theirs = { a: 2 };
    const out = await reconstructConflict(merged, ours, theirs, "json");
    expect(out).toContain("<<<<<<< ours");
    expect(out).toContain("=======\n  2");
    expect(out).toContain(">>>>>>> theirs");
  });

  it("handles nested objects", async () => {
    const merged = { x: { y: undefined } };
    const ours = { x: { y: "foo" } };
    const theirs = { x: { y: "bar" } };
    const out = await reconstructConflict(merged, ours, theirs, "json");
    expect(out).toMatch(/foo/);
    expect(out).toMatch(/bar/);
  });

  it("handles arrays with conflicts", async () => {
    const merged = { arr: [1, undefined, 3] };
    const ours = { arr: [1, 2, 3] };
    const theirs = { arr: [1, 99, 3] };
    const out = await reconstructConflict(merged, ours, theirs, "json");
    expect(out).toContain("<<<<<<< ours");
    expect(out).toContain("99");
  });

  it("does not break when no conflicts", async () => {
    const merged = { ok: 42 };
    const out = await reconstructConflict(
      merged,
      { ok: 42 },
      { ok: 42 },
      "json",
    );
    expect(out).toContain("42");
    expect(out).not.toContain("<<<<<<< ours");
  });
});
