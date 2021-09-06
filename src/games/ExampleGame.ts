import type {
  SingleLoserGameReport, SingleWinnerGameReport
} from 'src/game/types/GameReports';
import {
  MultiplayerGame,
  MultiplayerGameConfig,
  MultiplayerGameState
} from 'src/game/types/MultiplayerGame';

export type ExampleGameConfig = MultiplayerGameConfig & Readonly<{
  initialValue: number;
  targetValue: number;
  minDelta: number;
  maxDelta: number;
  misere: number;
}>;

export type ExampleGameState = MultiplayerGameState & Readonly<{
  currentValue: number;
}>;

export type ExampleGameAction = Readonly<{
  delta: number;
}>;

export type ExampleGameReport = SingleWinnerGameReport | SingleLoserGameReport | {};

export class ExampleGame extends MultiplayerGame<
  ExampleGameConfig,
  ExampleGameState,
  ExampleGameAction,
  ExampleGameReport
> {

  protected override createInitialState(): ExampleGameState {
    return {
      currentPlayerIndex: 0,
      currentValue: this.config.initialValue,
    };
  }

  public override isLegalAction(action: ExampleGameAction): boolean {
    const { minDelta, maxDelta } = this.config;
    const { delta } = action;
    return minDelta <= delta && delta <= maxDelta;
  }

  public override newStateForLegalAction(action: ExampleGameAction): ExampleGameState {
    const { currentValue } = this.state;
    const { delta } = action;
    return {
      currentPlayerIndex: this.nextPlayerIndex,
      currentValue: currentValue + delta,
    };
  }

  public override isComplete(): boolean {
    return this.state.currentValue === this.config.targetValue;
  }

  public override getReportForGameIncomplete(): ExampleGameReport {
    return {};
  }

  public override getReportForGameComplete(): ExampleGameReport {
    const { misere } = this.config;
    const { currentPlayerIndex } = this.state;
    if (misere) {
      return { winningPlayerIndex: currentPlayerIndex };
    } else {
      return { losingPlayerIndex: currentPlayerIndex };
    }
  }

}
