import type { GameDefinition } from '../../game/types/GameDefinition2';

export type GameRegistration = Readonly<{
  displayName: string;
  definition: GameDefinition;
}>;
