import type React from 'react';
import type { GameDefinition } from '../../../gameDefinition/types/GameDefinition';
import type { GameRegistration } from '../../../gameRegistration/types/GameRegistration';
import type { GameConfigUIProps } from '../../../gameUI/types/GameConfigUIProps';
import type { GameUIProps } from '../../../gameUI/types/GameUIProps';
import type { JsonObject } from '../../../generalPurpose/types/Json';
import { NimGameConfigUI } from '../components/NimGameConfigUI';
import { NimGameUI } from '../components/NimGameUI';
import { NimGameDefinition } from './NimGameDefinition';

export const NimGameRegistration: GameRegistration = {
  displayName: 'Nim',
  definition: NimGameDefinition as unknown as GameDefinition<JsonObject, JsonObject, JsonObject, JsonObject>,
  customConfigUI: NimGameConfigUI as unknown as React.ComponentType<GameConfigUIProps<JsonObject>>,
  gameUI: NimGameUI as unknown as React.ComponentType<GameUIProps<JsonObject, JsonObject, JsonObject, JsonObject>>,
};
