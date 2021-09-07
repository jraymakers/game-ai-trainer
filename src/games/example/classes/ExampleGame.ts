import { MultiplayerGame } from '../../../game/classes/MultiplayerGame';
import type { ExampleGameAction } from '../types/ExampleGameAction';
import type { ExampleGameConfig } from '../types/ExampleGameConfig';
import type { ExampleGameReport } from '../types/ExampleGameReport';
import type { ExampleGameState } from '../types/ExampleGameState';

export class ExampleGame extends MultiplayerGame<
  ExampleGameConfig,
  ExampleGameState,
  ExampleGameAction,
  ExampleGameReport
> {

  protected createInitialState(): ExampleGameState {
    return {
      currentPlayerIndex: 0,
      currentValue: this.config.initialValue,
    };
  }

  public isLegalAction(action: ExampleGameAction): boolean {
    const { minDelta, maxDelta } = this.config;
    const { delta } = action;
    return minDelta <= delta && delta <= maxDelta;
  }

  public newStateForLegalAction(action: ExampleGameAction): ExampleGameState {
    const { currentValue } = this.state;
    const { delta } = action;
    return {
      currentPlayerIndex: this.nextPlayerIndex,
      currentValue: currentValue + delta,
    };
  }

  public isComplete(): boolean {
    return this.state.currentValue === this.config.targetValue;
  }

  public getReportForGameIncomplete(): ExampleGameReport {
    return {};
  }

  public getReportForGameComplete(): ExampleGameReport {
    const { misere } = this.config;
    const { currentPlayerIndex } = this.state;
    if (misere) {
      return { winningPlayerIndex: currentPlayerIndex };
    } else {
      return { losingPlayerIndex: currentPlayerIndex };
    }
  }

}
