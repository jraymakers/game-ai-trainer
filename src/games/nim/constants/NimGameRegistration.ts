import type React from 'react';
import type { GameConfigUIProps } from '../../../game/types/GameConfigUIProps';
import type { GameDefinition } from '../../../game/types/GameDefinition';
import type { GameRegistration } from '../../../game/types/GameRegistration';
import type { GameUIProps } from '../../../game/types/GameUIProps';
import type { JsonObject } from '../../../generalPurpose/types/Json';
import { NimGameConfigUI } from '../components/NimGameConfigUI';
import { NimGameUI } from '../components/NimGameUI';
import { NimGameDefinition } from './NimGameDefinition';

export const NimGameRegistration: GameRegistration = {
  displayName: 'Nim',
  definition: NimGameDefinition as unknown as GameDefinition<JsonObject, JsonObject, JsonObject, JsonObject>,
  configUI: NimGameConfigUI as unknown as React.ComponentType<GameConfigUIProps<JsonObject>>,
  gameUI: NimGameUI as unknown as React.ComponentType<GameUIProps<JsonObject, JsonObject, JsonObject>>,
};
