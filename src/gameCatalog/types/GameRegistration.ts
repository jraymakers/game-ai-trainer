import type React from 'react';
import type { GameDefinition } from '../../game/types/GameDefinition2';
import type { JsonObject } from '../../generalPurpose/types/Json';

export type GameConfigEditorProps<TConfig> = Readonly<{
  onSubmit: (gameConfig: TConfig) => void;
  onCancel: () => void;
}>;

export type GameUIProps<TConfig, TState, TAction> = Readonly<{
  config: TConfig;
  state: TState;
  onAction: (action: TAction) => void;
  onLeave: () => void;
}>;

export type GameRegistration = Readonly<{
  displayName: string;
  definition: GameDefinition<JsonObject,JsonObject,JsonObject,JsonObject>;
  configEditor?: React.ComponentType<GameConfigEditorProps<JsonObject>>;
  ui?: React.ComponentType<GameUIProps<JsonObject,JsonObject,JsonObject>>;
}>;
