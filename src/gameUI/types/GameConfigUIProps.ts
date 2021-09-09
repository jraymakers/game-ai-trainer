export type GameConfigUIProps<TConfig> = Readonly<{
  onSubmit: (gameConfig: TConfig) => void;
  onCancel: () => void;
}>;
