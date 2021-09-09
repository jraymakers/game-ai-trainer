export type GameDefinition<TConfig, TState, TAction> = Readonly<{
  isLegalConfig: (config: TConfig) => boolean;
  createInitialState: (config: TConfig) => TState;
  isLegalAction: (config: TConfig, state: TState, action: TAction) => boolean;
  getStateAfterAction: (config: TConfig, state: TState, action: TAction) => TState;
}>;
