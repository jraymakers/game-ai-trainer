export type GameState<TCustomGameState, TGameResult> = Readonly<{
  currentPlayerIndex: number;
  gameResult: TGameResult | null;
  customGameState: TCustomGameState;
}>;
