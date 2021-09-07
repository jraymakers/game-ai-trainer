import { ExampleGameDefinition } from '../../games/example/ExampleGameDefinition2';
import { NimGameDefinition } from '../../games/nim/NimGameDefinition2';
import type { GameRegistration } from '../types/GameRegistration';

export const gameCatalog: readonly GameRegistration[] = [
  {
    displayName: 'Example',
    definition: ExampleGameDefinition,
  },
  {
    displayName: 'Nim',
    definition: NimGameDefinition,
  },
];
