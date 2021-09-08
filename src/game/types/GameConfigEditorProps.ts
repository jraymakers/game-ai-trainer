export type GameConfigEditorProps<TConfig> = Readonly<{
  onSubmit: (gameConfig: TConfig) => void;
  onCancel: () => void;
}>;
