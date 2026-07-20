/**
 * Limits text to a maximum number of characters, adding an ellipsis when it is truncated.
 */
export function truncateText(value: string, maxLength: number | undefined): string {
  if (maxLength === undefined || maxLength < 0 || value.length <= maxLength) {
    return value;
  }

  if (maxLength <= 3) {
    return '.'.repeat(maxLength);
  }

  return `${value.slice(0, maxLength - 3)}...`;
}
