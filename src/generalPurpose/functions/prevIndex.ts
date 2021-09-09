export function prevIndex(current: number, list: readonly unknown[]): number {
  const length = list.length;
  return (current - 1 + length) % length;
}
