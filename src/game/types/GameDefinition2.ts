// import type { JsonObject } from '../generalPurpose/types/Json';

export type GameDefinition<
  TConfig = any,// extends JsonObject = JsonObject,
  TState = any,// extends JsonObject = JsonObject,
  TAction = any,// extends JsonObject = JsonObject,
  TReport = any// extends JsonObject = JsonObject,
> = Readonly<{
  isLegalConfig: (config: TConfig) => boolean;
  createInitialState: (config: TConfig) => TState;
  isLegalAction: (config: TConfig, state: TState, action: TAction) => boolean;
  getStateAfterAction: (config: TConfig, state: TState, action: TAction) => TState;
  isComplete: (config: TConfig, state: TState) => boolean;
  getReport: (config: TConfig, state: TState) => TReport;
}>;
