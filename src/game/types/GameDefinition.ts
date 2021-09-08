export type GameDefinition<TConfig, TState, TAction, TReport> = Readonly<{
  isLegalConfig: (config: TConfig) => boolean;
  createInitialState: (config: TConfig) => TState;
  isLegalAction: (config: TConfig, state: TState, action: TAction) => boolean;
  getStateAfterAction: (config: TConfig, state: TState, action: TAction) => TState;
  isComplete: (config: TConfig, state: TState) => boolean;
  getReport: (config: TConfig, state: TState) => TReport;
}>;
