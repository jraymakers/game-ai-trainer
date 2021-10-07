export function indexOfMaxItem<T>(list: readonly T[], valueForItem: (item: T) => (number | null)): number | null {
  let maxIndex = null;
  let maxValue = null;
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const value = valueForItem(item);
    if (value !== null && (maxValue === null || value > maxValue)) {
      maxIndex = i;
      maxValue = value;
    }
  }
  return maxIndex;
}
