import type { JsonObject } from '../../generalPurpose/types/Json';
import type { Result } from '../../generalPurpose/types/Result';

export type GameDefinition<
  TConfig extends JsonObject = JsonObject,
  TState extends JsonObject = JsonObject,
  TAction extends JsonObject = JsonObject,
  TReport extends JsonObject = JsonObject,
> = Readonly<{
  createInitialState: (config: TConfig) => Result<TState>;
  isLegalAction: (config: TConfig, state: TState, action: TAction) => boolean;
  performAction: (config: TConfig, state: TState, action: TAction) => Result<TState>;
  isComplete: (config: TConfig, state: TState) => boolean;
  getReport: (config: TConfig, state: TState) => TReport;
}>;
