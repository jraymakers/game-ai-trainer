export type Entity = Readonly<{
  id: string;
}>;

export type NamedEntity = Entity & Readonly<{
  displayName: string;
}>;
