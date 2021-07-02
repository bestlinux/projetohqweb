import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { ListaLeituraRoutingModule } from './listaleitura-routing.module';
import { ListaLeituraComponent } from './listaleitura.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    ListaLeituraRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ],
  declarations: [ListaLeituraComponent],
})
export class ListaLeituraModule {}
