import type React from 'react';
import type { GameDefinition } from '../../game/types/GameDefinition2';
import type { JsonObject } from '../../generalPurpose/types/Json';

export type GameConfigEditorProps = Readonly<{
  onSubmit: (gameConfig: JsonObject) => void;
  onCancel: () => void;
}>;

export type GameRegistration = Readonly<{
  displayName: string;
  definition: GameDefinition<JsonObject,JsonObject,JsonObject,JsonObject>;
  configEditor?: React.ComponentType<GameConfigEditorProps>;
}>;
