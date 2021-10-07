export function indicesOfItemsWhere<T>(list: readonly T[], includeItem: (item: T) => boolean): number[] {
  const indices: number[] = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (includeItem(item)) {
      indices.push(i);
    }
  }
  return indices;
}
