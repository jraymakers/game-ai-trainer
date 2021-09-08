import type React from 'react';
import type { JsonObject } from '../../generalPurpose/types/Json';
import type { GameConfigUIProps } from './GameConfigUIProps';
import type { GameDefinition } from './GameDefinition';
import type { GameUIProps } from './GameUIProps';

export type GameRegistration = Readonly<{
  displayName: string;
  definition: GameDefinition<JsonObject,JsonObject,JsonObject,JsonObject>;
  configUI: React.ComponentType<GameConfigUIProps<JsonObject>>;
  gameUI: React.ComponentType<GameUIProps<JsonObject,JsonObject,JsonObject>>;
}>;
