import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';

import { EditoraRoutingModule } from './editora.component-routing.module';
import { EditoraComponent } from './editora.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

//import { ToastComponent } from '@shared/toast/toast.component';
//import { ToastsContainer } from './toasts-container.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    EditoraRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    RxReactiveFormsModule,
  ],
  declarations: [EditoraComponent],
})
export class EditoraModule {}
