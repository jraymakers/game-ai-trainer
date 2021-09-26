import type { GameConfig } from './GameConfig';
import type { GameState } from './GameState';

export type GameDefinition<TCustomGameConfig, TCustomGameState, TGameAction, TGameResult> = Readonly<{

  getMinPlayerCount: () => number;
  getMaxPlayerCount: () => number;
  getDefaultPlayerCount: () => number;
  getDefaultCustomGameConfig: () => TCustomGameConfig;

  getStateKey: (
    gameState: GameState<TCustomGameState, TGameResult>,
    gameConfig: GameConfig<TCustomGameConfig>,
  ) => string;

  getActionKey: (
    gameAction: TGameAction,
  ) => string;

  createInitialState: (
    gameConfig: GameConfig<TCustomGameConfig>,
  ) => GameState<TCustomGameState, TGameResult>;

  getLegalActions: (
    gameState: GameState<TCustomGameState, TGameResult>,
    gameConfig: GameConfig<TCustomGameConfig>,
  ) => readonly TGameAction[];

  getStateAfterAction: (
    gameAction: TGameAction,
    gameState: GameState<TCustomGameState, TGameResult>,
    gameConfig: GameConfig<TCustomGameConfig>,
  ) => GameState<TCustomGameState, TGameResult>;

}>;
