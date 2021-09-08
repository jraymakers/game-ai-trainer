import { ExampleGameRegistration } from '../../games/example/constants/ExampleGameRegistration';
import { NimGameRegistration } from '../../games/nim/constants/NimGameRegistration';
import type { GameRegistration } from '../types/GameRegistration';

export const gameCatalog: readonly GameRegistration[] = [
  ExampleGameRegistration,
  NimGameRegistration,
];
