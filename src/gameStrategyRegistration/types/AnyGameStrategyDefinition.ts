import type { GameStrategyDefinition } from '../../gameStrategyDefinition/types/GameStrategyDefinition';
import type { JsonObject } from '../../generalPurpose/types/Json';

export type AnyGameStrategyDefinition =
  GameStrategyDefinition<JsonObject, JsonObject, JsonObject, JsonObject, JsonObject>;
