import { HQ } from '../../@shared/models/hq';

export interface DataResponseHQ {
  succeeded: boolean;
  message: string;
  errors: string;
  data: HQ;
}
