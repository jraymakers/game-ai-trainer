import type { JsonObject } from '../../generalPurpose/types/Json';

export type PlayerMemory = Readonly<{
  memoryForGame: {
    readonly [gameDisplayName: string]: JsonObject | undefined;
  }
}>;
