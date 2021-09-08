import { MultiplayerGame } from '../../../game/classes/MultiplayerGame';
import type { NimGameConfig } from '../types/NimGameConfig';
import type { NimGameAction } from '../types/NimGameAction';
import type { NimGameReport } from '../types/NimGameReport';
import type { NimGameState } from '../types/NimGameState';

export class NimGame extends MultiplayerGame<
  NimGameConfig,
  NimGameState,
  NimGameAction,
  NimGameReport
> {

  protected createInitialState(): NimGameState {
    return {
      currentPlayerIndex: 0,
      currentRows: this.config.initialRows,
    };
  }

  public isLegalAction(action: NimGameAction): boolean {
    const { currentRows } = this.state;
    const { rowIndex, itemsToRemove } = action;
    return 0 <= rowIndex && rowIndex < currentRows.length && itemsToRemove <= currentRows[rowIndex];
  }

  public newStateForLegalAction(action: NimGameAction): NimGameState {
    const { currentRows } = this.state;
    const { rowIndex, itemsToRemove } = action;
    return {
      currentPlayerIndex: this.nextPlayerIndex,
      currentRows: currentRows.map(
        (rowItemCount, index) => index === rowIndex ? rowItemCount - itemsToRemove : rowItemCount
      ),
    };
  }

  public isComplete(): boolean {
    return !this.state.currentRows.some(rowItemCount => rowItemCount > 0);
  }

  public getReportForGameIncomplete(): NimGameReport {
    return {};
  }

  public getReportForGameComplete(): NimGameReport {
    const { misere } = this.config;
    if (misere) {
      return { losingPlayerIndex: this.previousPlayerIndex };
    } else {
      return { winningPlayerIndex: this.previousPlayerIndex };
    }
  }

}
