import type { JsonObject } from '../../generalPurpose/types/Json';

export type PlayerGameMemory = Readonly<{
  strategyMemories: {
    readonly [strategyDisplayName: string]: JsonObject | undefined;
  }
}>;
