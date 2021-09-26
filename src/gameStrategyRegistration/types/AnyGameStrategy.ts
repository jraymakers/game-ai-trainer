import type { GameStrategy } from '../../gameStrategy/types/GameStrategy';
import type { JsonObject } from '../../generalPurpose/types/Json';

export type AnyGameStrategy = GameStrategy<JsonObject, JsonObject, JsonObject, JsonObject, JsonObject>;
