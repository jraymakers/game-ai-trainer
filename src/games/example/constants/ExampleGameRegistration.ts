import type { GameRegistration } from '../../../gameCatalog/types/GameRegistration';
import type { ExampleGameAction } from '../types/ExampleGameAction';
import type { ExampleGameConfig } from '../types/ExampleGameConfig';
import type { ExampleGameReport } from '../types/ExampleGameReport';
import type { ExampleGameState } from '../types/ExampleGameState';
import { ExampleGameDefinition } from './ExampleGameDefinition2';

export const ExampleGameRegistration: GameRegistration<
  ExampleGameConfig,
  ExampleGameState,
  ExampleGameAction,
  ExampleGameReport
> = {
  displayName: 'Example',
  definition: ExampleGameDefinition,
};
