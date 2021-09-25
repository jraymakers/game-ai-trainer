import type { GameConfig } from '../../gameDefinition/types/GameConfig';
import type { GameDefinition } from '../../gameDefinition/types/GameDefinition';
import type { GameState } from '../../gameDefinition/types/GameState';

export type GameStrategy<TCustomGameConfig, TCustomGameState, TGameAction, TGameResult> = Readonly<{
  getNextAction: (
    gameState: GameState<TCustomGameState, TGameResult>,
    gameConfig: GameConfig<TCustomGameConfig>,
    gameDefinition: GameDefinition<TCustomGameConfig, TCustomGameState, TGameAction, TGameResult>,
  ) => TGameAction;
}>;
