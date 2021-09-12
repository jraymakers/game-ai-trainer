import type { GameConfig } from '../../gameDefinition/types/GameConfig';
import type { GameState } from '../../gameDefinition/types/GameState';

export type GameUIProps<TCustomGameConfig, TCustomGameState, TGameAction, TGameResult> = Readonly<{
  gameConfig: GameConfig<TCustomGameConfig>;
  gameState: GameState<TCustomGameState, TGameResult>;
  onGameAction: (gameAction: TGameAction) => void;
}>;
