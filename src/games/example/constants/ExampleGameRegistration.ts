import type { GameDefinition } from '../../../game/types/GameDefinition2';
import type { GameRegistration } from '../../../gameCatalog/types/GameRegistration';
import type { JsonObject } from '../../../generalPurpose/types/Json';
import { ExampleGameDefinition } from './ExampleGameDefinition2';

export const ExampleGameRegistration: GameRegistration = {
  displayName: 'Example',
  definition: ExampleGameDefinition as unknown as GameDefinition<JsonObject, JsonObject, JsonObject, JsonObject>,
};
