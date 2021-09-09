export type GameDefinition<TConfig, TState, TAction> = Readonly<{
  createInitialState: (config: TConfig) => TState;
  getStateAfterAction: (config: TConfig, state: TState, action: TAction) => TState;
}>;
