export type Stat = {
  /** numeric target for the count-up */
  value: number;
  /** rendering: prefix + formatted value + suffix */
  prefix?: string;
  suffix: string;
  decimals?: number;
  label: string;
};

/** Placeholder numbers — clearly marked, easy to change. */
export const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 20, suffix: "+", label: "Brands worked with" },
  { value: 4.2, suffix: "M+", decimals: 1, label: "Ad reach generated" },
  { value: 3.1, suffix: "x", decimals: 1, label: "Average client growth" },
];
