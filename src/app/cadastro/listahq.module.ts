import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../@shared';
import { ListaHQRoutingModule } from './listahq-routing.module';
import { ListaHQComponent } from './listahq.component';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    ListaHQRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ],
  declarations: [ListaHQComponent],
})
export class ListaHQModule {}
