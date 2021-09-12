export type GameConfig<TCustomGameConfig> = Readonly<{
  playerIds: readonly string[];
  customGameConfig: TCustomGameConfig;
}>;
