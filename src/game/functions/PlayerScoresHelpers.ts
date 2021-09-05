import type { BaseGameState, PlayerScores } from '../types/GameDefinition';

export function zeroScores(state: BaseGameState): PlayerScores {
  return state.config.players.map(_ => 0);
}

export function singleWinnerScores(state: BaseGameState, winnerIndex: number): PlayerScores {
  return state.config.players.map((_, playerIndex) => playerIndex === winnerIndex ? 1 : 0);
}

export function singleLoserScores(state: BaseGameState, loserIndex: number): PlayerScores {
  return state.config.players.map((_, playerIndex) => playerIndex === loserIndex ? 0 : 1);
}
