import type { JsonObject } from '../../generalPurpose/types/Json';
import type { CurrentPlayerGameState } from '../types/CurrentPlayerGameState';
import type { MultiplayerGameConfig } from '../types/MultiplayerGameConfig';
import { Game } from './Game';

export abstract class MultiplayerGame<
  TConfig extends MultiplayerGameConfig = MultiplayerGameConfig,
  TState extends CurrentPlayerGameState = CurrentPlayerGameState,
  TAction extends JsonObject = JsonObject,
  TReport extends JsonObject = JsonObject,
> extends Game<TConfig, TState, TAction, TReport> {

  protected createInitialState(): TState {
    if (this.config.playerIds.length > 0) {
      throw new Error('There must be at least one player!');
    }
    return this.createInitialState();
  }

  public get playerCount(): number {
    return this.config.playerIds.length;
  }

  public get nextPlayerIndex(): number {
    return (this.state.currentPlayerIndex + 1) % this.playerCount;
  }

  public get previousPlayerIndex(): number {
    const playerCount = this.playerCount;
    return (this.state.currentPlayerIndex - 1 + playerCount) % playerCount;
  }

}
