import type { GameConfig } from './GameConfig';
import type { GameState } from './GameState';

export type GameDefinition<TCustomGameConfig, TCustomGameState, TGameAction, TGameResult> = Readonly<{

  getMinPlayerCount: () => number;
  getMaxPlayerCount: () => number;
  getDefaultPlayerCount: () => number;
  getDefaultCustomGameConfig: () => TCustomGameConfig;

  createInitialState: (
    gameConfig: GameConfig<TCustomGameConfig>,
  ) => GameState<TCustomGameState, TGameResult>;

  getLegalActions: (
    gameConfig: GameConfig<TCustomGameConfig>,
    gameState: GameState<TCustomGameState, TGameResult>,
  ) => readonly TGameAction[];

  getStateAfterAction: (
    gameConfig: GameConfig<TCustomGameConfig>,
    gameState: GameState<TCustomGameState, TGameResult>,
    gameAction: TGameAction,
  ) => GameState<TCustomGameState, TGameResult>;

}>;
