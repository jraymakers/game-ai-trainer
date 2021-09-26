export function randomItem<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}
