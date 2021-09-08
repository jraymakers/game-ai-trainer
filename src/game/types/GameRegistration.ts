import type React from 'react';
import type { JsonObject } from '../../generalPurpose/types/Json';
import type { GameConfigEditorProps } from './GameConfigEditorProps';
import type { GameDefinition } from './GameDefinition';
import type { GameUIProps } from './GameUIProps';

export type GameRegistration = Readonly<{
  displayName: string;
  definition: GameDefinition<JsonObject,JsonObject,JsonObject,JsonObject>;
  configEditor?: React.ComponentType<GameConfigEditorProps<JsonObject>>;
  ui?: React.ComponentType<GameUIProps<JsonObject,JsonObject,JsonObject>>;
}>;
