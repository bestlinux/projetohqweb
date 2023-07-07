import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';

import { FrasesRoutingModule } from './frases-routing.module';
import { FrasesComponent } from './frases.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { DataTablesModule } from 'angular-datatables';
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
    DataTablesModule,
  ],
  declarations: [FrasesComponent],
})
export class FrasesModule {}
