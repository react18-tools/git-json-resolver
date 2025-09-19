import type { NormalizedConfig } from "./normalizer";

export const resolveStrategies = (
  path: string,
  { rules, matcher }: NormalizedConfig,
): string[] => {
  const exactPathStrategies = rules.exact[path] ?? [];
  const exactFieldStrategies =
    rules.exactFields[path.split(".").pop() ?? ""] ?? [];
  const patternStrategies = Object.entries(rules.patterns)
    .filter(([glob]) => matcher.isMatch(path, [glob]))
    .flatMap(([, v]) => v);

  const allStrategies = [
    ...exactPathStrategies.flatMap((s) => s.strategies),
    ...exactFieldStrategies.flatMap((s) => s.strategies),
    ...patternStrategies.flatMap((s) => s.strategies),
    ...rules.default,
  ];

  const important = allStrategies.filter((s) => s.important);
  const normal = allStrategies.filter((s) => !s.important);

  return [...important, ...normal].map((strategy) => strategy.name);
};
