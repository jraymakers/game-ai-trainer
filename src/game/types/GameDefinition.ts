import type { NamedEntity } from 'src/generalPurpose/types/Entity';
import type { JsonObject } from 'src/generalPurpose/types/Json';

export type GameError = Readonly<{
  message: string;
}>;

export type Player = NamedEntity & Readonly<{
}>;

export type Players = readonly Player[];

export type PlayerScores = readonly number[];

export type BaseGameConfig = JsonObject & Readonly<{
  players: Players;
}>;

export type BaseGameState<TConfig extends BaseGameConfig = BaseGameConfig> = JsonObject & Readonly<{
  config: TConfig;
}>;

export type GameDefinition<
  TConfig extends BaseGameConfig = BaseGameConfig,
  TState extends BaseGameState<TConfig> = BaseGameState<TConfig>,
  TAction extends JsonObject = JsonObject,
> = Readonly<{
  displayName: string;
  createInitialState: (config: TConfig) => TState | GameError;
  isLegalAction: (state: TState, action: TAction) => boolean;
  performAction: (state: TState, action: TAction) => TState | GameError;
  isCompleted: (state: TState) => boolean;
  getPlayerScores: (state: TState) => PlayerScores;
}>;
