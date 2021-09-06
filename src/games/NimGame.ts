import type { SingleLoserGameReport, SingleWinnerGameReport } from 'src/game/types/GameReports';
import { MultiplayerGame, MultiplayerGameConfig, MultiplayerGameState } from 'src/game/types/MultiplayerGame';

export type NimRows = readonly number[];

export type NimGameConfig = MultiplayerGameConfig & Readonly<{
  initialRows: NimRows;
  misere: number;
}>;

export type NimGameState = MultiplayerGameState & Readonly<{
  currentRows: NimRows;
}>;

export type NimGameAction = Readonly<{
  rowIndex: number;
  itemsToRemove: number;
}>;

export type NimGameReport = SingleWinnerGameReport | SingleLoserGameReport | {};

export class NimGame extends MultiplayerGame<
  NimGameConfig,
  NimGameState,
  NimGameAction,
  NimGameReport
> {

  protected override createInitialState(): NimGameState {
    return {
      currentPlayerIndex: 0,
      currentRows: this.config.initialRows,
    };
  }

  public override isLegalAction(action: NimGameAction): boolean {
    const { currentRows } = this.state;
    const { rowIndex, itemsToRemove } = action;
    return 0 <= rowIndex && rowIndex < currentRows.length && currentRows[rowIndex] <= itemsToRemove;
  }

  public override newStateForLegalAction(action: NimGameAction): NimGameState {
    const { currentRows } = this.state;
    const { rowIndex, itemsToRemove } = action;
    return {
      currentPlayerIndex: this.nextPlayerIndex,
      currentRows: currentRows.map(
        (rowItemCount, index) => index === rowIndex ? rowItemCount - itemsToRemove : rowItemCount
      ),
    };
  }

  public override isComplete(): boolean {
    return !this.state.currentRows.some(rowItemCount => rowItemCount > 0);
  }

  public override getReportForGameIncomplete(): NimGameReport {
    return {};
  }

  public override getReportForGameComplete(): NimGameReport {
    const { misere } = this.config;
    if (misere) {
      return { losingPlayerIndex: this.previousPlayerIndex };
    } else {
      return { winningPlayerIndex: this.previousPlayerIndex };
    }
  }

}
