import { Frase } from '../../@shared/models/frase';

export interface DataResponseFrases {
  succeeded: boolean;
  message: string;
  errors: string;
  data: Frase;
}
