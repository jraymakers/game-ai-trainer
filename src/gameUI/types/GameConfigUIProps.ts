export type GameConfigUIProps<TCustomGameConfig> = Readonly<{
  customGameConfig: TCustomGameConfig;
  onCustomGameConfigChanged: (newCustomGameConfig: TCustomGameConfig) => void;
}>;
