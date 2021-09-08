import type { GameDefinition } from '../../../game/types/GameDefinition2';
import type { GameRegistration } from '../../../gameCatalog/types/GameRegistration';
import type { JsonObject } from '../../../generalPurpose/types/Json';
import { NimGameConfigEditor } from '../components/NimGameConfigEditor';
import { NimGameDefinition } from './NimGameDefinition2';

export const NimGameRegistration: GameRegistration = {
  displayName: 'Nim',
  definition: NimGameDefinition as unknown as GameDefinition<JsonObject, JsonObject, JsonObject, JsonObject>,
  configEditor: NimGameConfigEditor,
};
