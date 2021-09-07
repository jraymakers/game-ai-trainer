import type { JsonObject } from '../../generalPurpose/types/Json';

export abstract class Game<
  TConfig extends JsonObject = JsonObject,
  TState extends JsonObject = JsonObject,
  TAction extends JsonObject = JsonObject,
  TReport extends JsonObject = JsonObject,
> {
  private _state: TState;
  constructor(protected readonly config: TConfig) {
    this._state = this.createInitialState();
  }
  protected abstract createInitialState(): TState;
  public get state(): TState {
    return this._state;
  };

  public abstract isLegalAction(action: TAction): boolean;
  public performAction(action: TAction): boolean {
    if (this.isLegalAction(action)) {
      this._state = this.newStateForLegalAction(action);
      return true;
    } else {
      return false;
    }
  }
  protected abstract newStateForLegalAction(action: TAction): TState;

  public abstract isComplete(): boolean;
  public getReport(): TReport {
    if (this.isComplete()) {
      return this.getReportForGameComplete();
    } else {
      return this.getReportForGameIncomplete();
    }
  }
  protected abstract getReportForGameComplete(): TReport;
  protected abstract getReportForGameIncomplete(): TReport;
}
