export function nextIndex(current: number, list: readonly unknown[]): number {
  return (current + 1) % list.length;
}
