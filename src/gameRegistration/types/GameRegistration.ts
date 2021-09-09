import type React from 'react';
import type { GameDefinition } from '../../gameDefinition/types/GameDefinition';
import type { GameConfigUIProps } from '../../gameUI/types/GameConfigUIProps';
import type { GameUIProps } from '../../gameUI/types/GameUIProps';
import type { JsonObject } from '../../generalPurpose/types/Json';

export type GameRegistration = Readonly<{
  displayName: string;
  definition: GameDefinition<JsonObject,JsonObject,JsonObject>;
  configUI: React.ComponentType<GameConfigUIProps<JsonObject>>;
  gameUI: React.ComponentType<GameUIProps<JsonObject,JsonObject,JsonObject>>;
}>;
