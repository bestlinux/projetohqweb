import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { ListaDesejoRoutingModule } from './listadesejo-routing.module';
import { ListaDesejoComponent } from './listadesejo.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    ListaDesejoRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ],
  declarations: [ListaDesejoComponent],
})
export class ListaDesejoModule {}
