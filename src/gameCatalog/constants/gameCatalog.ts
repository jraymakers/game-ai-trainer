import { ExampleGameDefinition } from '../../games/example/constants/ExampleGameDefinition2';
import { NimGameConfigEditor } from '../../games/nim/components/NimGameConfigEditor';
import { NimGameDefinition } from '../../games/nim/constants/NimGameDefinition2';
import type { GameRegistration } from '../types/GameRegistration';

export const gameCatalog: readonly GameRegistration[] = [
  {
    displayName: 'Example',
    definition: ExampleGameDefinition,
  },
  {
    displayName: 'Nim',
    definition: NimGameDefinition,
    configEditor: NimGameConfigEditor,
  },
];
