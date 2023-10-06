<<<<<<< HEAD
import { Frase } from '../../@shared/models/frase';
=======
import { Frase } from '@shared/models/frase';
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682

export interface DataResponseFrases {
  succeeded: boolean;
  message: string;
  errors: string;
  data: Frase;
}
