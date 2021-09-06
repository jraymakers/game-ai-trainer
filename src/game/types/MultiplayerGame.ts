import type { JsonObject } from '../../generalPurpose/types/Json';
import { Game } from './Game';

export type MultiplayerGameConfig = Readonly<{
  playerIds: readonly string[];
}>;

export type MultiplayerGameState = Readonly<{
  currentPlayerIndex: number;
}>;

export abstract class MultiplayerGame<
  TConfig extends MultiplayerGameConfig = MultiplayerGameConfig,
  TState extends MultiplayerGameState = MultiplayerGameState,
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
