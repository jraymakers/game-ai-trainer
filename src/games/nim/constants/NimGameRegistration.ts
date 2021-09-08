import type { GameRegistration } from '../../../gameCatalog/types/GameRegistration';
import { NimGameConfigEditor } from '../components/NimGameConfigEditor';
import type { NimGameAction } from '../types/NimGameAction';
import type { NimGameConfig } from '../types/NimGameConfig';
import type { NimGameReport } from '../types/NimGameReport';
import type { NimGameState } from '../types/NimGameState';
import { NimGameDefinition } from './NimGameDefinition2';

export const NimGameRegistration: GameRegistration<
  NimGameConfig,
  NimGameState,
  NimGameAction,
  NimGameReport
> = {
  displayName: 'Nim',
  definition: NimGameDefinition,
  configEditor: NimGameConfigEditor,
};
