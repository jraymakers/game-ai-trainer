import type React from 'react';
import type { GameDefinition } from '../../../gameDefinition/types/GameDefinition';
import type { GameRegistration } from '../../../gameRegistration/types/GameRegistration';
import type { GameConfigUIProps } from '../../../gameUI/types/GameConfigUIProps';
import type { GameUIProps } from '../../../gameUI/types/GameUIProps';
import type { JsonObject } from '../../../generalPurpose/types/Json';
import { TicTacToeGameConfigUI } from '../components/TicTacToeGameConfigUI';
import { TicTacToeGameUI } from '../components/TicTacToeGameUI';
import { TicTacToeGameDefinition } from './TicTacToeGameDefinition';

export const TicTacToeGameRegistration: GameRegistration = {
  displayName: 'Tic-Tac-Toe',
  definition: TicTacToeGameDefinition as unknown as GameDefinition<JsonObject, JsonObject, JsonObject>,
  configUI: TicTacToeGameConfigUI as unknown as React.ComponentType<GameConfigUIProps<JsonObject>>,
  gameUI: TicTacToeGameUI as unknown as React.ComponentType<GameUIProps<JsonObject, JsonObject, JsonObject>>,
};
