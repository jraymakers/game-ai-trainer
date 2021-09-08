import type React from 'react';
import type { GameConfigEditorProps } from '../../../game/types/GameConfigEditorProps';
import type { GameDefinition } from '../../../game/types/GameDefinition';
import type { GameRegistration } from '../../../game/types/GameRegistration';
import type { GameUIProps } from '../../../game/types/GameUIProps';
import type { JsonObject } from '../../../generalPurpose/types/Json';
import { NimGameConfigEditor } from '../components/NimGameConfigEditor';
import { NimGameUI } from '../components/NimGameUI';
import { NimGameDefinition } from './NimGameDefinition';

export const NimGameRegistration: GameRegistration = {
  displayName: 'Nim',
  definition: NimGameDefinition as unknown as GameDefinition<JsonObject, JsonObject, JsonObject, JsonObject>,
  configEditor: NimGameConfigEditor as unknown as React.ComponentType<GameConfigEditorProps<JsonObject>>,
  ui: NimGameUI as unknown as React.ComponentType<GameUIProps<JsonObject, JsonObject, JsonObject>>,
};
