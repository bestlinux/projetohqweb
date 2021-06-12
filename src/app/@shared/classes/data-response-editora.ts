import { Editora } from '@shared/models/editora';

export interface DataResponseEditora {
  succeeded: boolean;
  message: string;
  errors: string;
  data: Editora;
}
