export function finiteNumberAttribute(value: unknown, fallback = 0): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function nonNegativeIntegerAttribute(value: unknown): number {
  return Math.max(0, Math.floor(finiteNumberAttribute(value)));
}

export function positiveNumberAttribute(value: unknown): number {
  return Math.max(1, finiteNumberAttribute(value, 1));
}
