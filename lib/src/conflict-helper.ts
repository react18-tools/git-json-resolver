import { serialize } from "./file-serializer";
import { DROP } from "./utils";

/** Remove DROP, replace undefined with conflict markers */
const preprocessForConflicts = (
  node: any,
  path: string,
  conflicts: string[] = [],
): any => {
  if (node === DROP) {
    return undefined; // remove key later
  }
  if (node === undefined) {
    const marker = `__CONFLICT_MARKER::${path}__`;
    conflicts.push(path);
    return marker;
  }
  if (Array.isArray(node)) {
    return node
      .map((v, i) => preprocessForConflicts(v, `${path}[${i}]`, conflicts))
      .filter((v) => v !== undefined);
  }
  if (node && typeof node === "object") {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(node)) {
      const val = preprocessForConflicts(
        v,
        path ? `${path}.${k}` : k,
        conflicts,
      );
      if (val !== undefined) out[k] = val;
    }
    return out;
  }
  return node;
};

/** Build conflict markers into serialized string */
export const reconstructConflict = async (
  merged: any,
  ours: any,
  theirs: any,
  format: string,
): Promise<string> => {
  const conflictPaths: string[] = [];
  const preprocessed = preprocessForConflicts(merged, "", conflictPaths);
  let serialized = await serialize(format, preprocessed);

  for (const path of conflictPaths) {
    const oursVal = getByPath(ours, path);
    const theirsVal = getByPath(theirs, path);

    const [oursStr, theirsStr] = await Promise.all(
      [oursVal, theirsVal].map((val) => serialize(format, val)),
    );

    const block = [
      "<<<<<<< ours",
      indentBlock(oursStr, 2),
      "=======",
      indentBlock(theirsStr, 2),
      ">>>>>>> theirs",
    ].join("\n");

    const marker = `__CONFLICT_MARKER::${path}__`;
    serialized = serialized.replace(
      /json/.test(format) ? JSON.stringify(marker) : marker,
      block,
    );
  }

  return serialized;
};

const getByPath = (obj: any, path: string): any => {
  const parts = path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);
  let cur = obj;
  for (const p of parts) cur = cur?.[p];
  return cur;
};

const indentBlock = (str: string, spaces: number) => {
  const pad = " ".repeat(spaces);
  return str
    .split("\n")
    .map((line) => (line ? pad + line : line))
    .join("\n");
};
