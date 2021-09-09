export type GameUIProps<TConfig, TState, TAction> = Readonly<{
  config: TConfig;
  state: TState;
  onAction: (action: TAction) => void;
  onLeave: () => void;
}>;
