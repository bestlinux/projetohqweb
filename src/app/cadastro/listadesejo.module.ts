import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

<<<<<<< HEAD
import { SharedModule } from '../@shared';
import { ListaDesejoRoutingModule } from './listadesejo-routing.module';
import { ListaDesejoComponent } from './listadesejo.component';
=======
import { SharedModule } from '@shared';
import { ListaDesejoRoutingModule } from './listadesejo-routing.module';
import { ListaDesejoComponent } from './listadesejo.component';
import { DataTablesModule } from 'angular-datatables';
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    ListaDesejoRoutingModule,
<<<<<<< HEAD
=======
    DataTablesModule,
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ],
  declarations: [ListaDesejoComponent],
})
export class ListaDesejoModule {}
