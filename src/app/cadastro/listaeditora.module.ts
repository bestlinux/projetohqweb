import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../@shared';
import { ListaEditorasRoutingModule } from './listaeditora-routing.module';
import { ListaEditoraComponent } from './listaeditora.component';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    ListaEditorasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ],
  declarations: [ListaEditoraComponent],
})
export class ListaEditoraModule {}
