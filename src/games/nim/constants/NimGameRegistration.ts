import type React from 'react';
import type { GameDefinition } from '../../../game/types/GameDefinition2';
import type { GameConfigEditorProps, GameRegistration, GameUIProps } from '../../../gameCatalog/types/GameRegistration';
import type { JsonObject } from '../../../generalPurpose/types/Json';
import { NimGameConfigEditor } from '../components/NimGameConfigEditor';
import { NimGameUI } from '../components/NimGameUI';
import { NimGameDefinition } from './NimGameDefinition2';

export const NimGameRegistration: GameRegistration = {
  displayName: 'Nim',
  definition: NimGameDefinition as unknown as GameDefinition<JsonObject, JsonObject, JsonObject, JsonObject>,
  configEditor: NimGameConfigEditor as unknown as React.ComponentType<GameConfigEditorProps<JsonObject>>,
  ui: NimGameUI as unknown as React.ComponentType<GameUIProps<JsonObject, JsonObject, JsonObject>>,
};
