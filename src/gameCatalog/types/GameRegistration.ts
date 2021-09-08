import type React from 'react';
import type { GameDefinition } from '../../game/types/GameDefinition2';

export type GameConfigEditorProps<TConfig> = Readonly<{
  onSubmit: (gameConfig: TConfig) => void;
  onCancel: () => void;
}>;

export type GameRegistration<TConfig=any,TState=any,TAction=any,TResult=any> = Readonly<{
  displayName: string;
  definition: GameDefinition<TConfig,TState,TAction,TResult>;
  configEditor?: React.ComponentType<GameConfigEditorProps<TConfig>>;
}>;
