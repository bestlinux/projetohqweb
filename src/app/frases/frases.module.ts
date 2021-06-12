import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';

import { FrasesRoutingModule } from './frases-routing.module';
import { FrasesComponent } from './frases.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//import { ToastComponent } from '@shared/toast/toast.component';
//import { ToastsContainer } from './toasts-container.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FrasesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    RxReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  declarations: [FrasesComponent],
})
export class FrasesModule {}
