import type { SingleLoserGameReport } from '../../../gameDefinition/types/SingleLoserGameReport';
import type { SingleWinnerGameReport } from '../../../gameDefinition/types/SingleWinnerGameReport';

export type NimGameReport = SingleWinnerGameReport | SingleLoserGameReport | {};
