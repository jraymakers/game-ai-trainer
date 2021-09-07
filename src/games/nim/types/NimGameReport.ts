import type { SingleLoserGameReport } from '../../../game/types/SingleLoserGameReport';
import type { SingleWinnerGameReport } from '../../../game/types/SingleWinnerGameReport';

export type NimGameReport = SingleWinnerGameReport | SingleLoserGameReport | {};
