export type MCTSActionMemory = Readonly<{
  nextStateKey: string;
  visits: number;
  wins: number;
}>;
