import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

<<<<<<< HEAD
import { SharedModule } from '../@shared';
=======
import { SharedModule } from '@shared';
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682

import { ColecaoRoutingModule } from './colecao-routing.module';
import { ColecaoComponent } from './colecao.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
<<<<<<< HEAD
//import { DataTablesModule } from 'angular-datatables';
=======
import { DataTablesModule } from 'angular-datatables';
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682
//import { ToastComponent } from '@shared/toast/toast.component';
//import { ToastsContainer } from './toasts-container.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ColecaoRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    RxReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
<<<<<<< HEAD
    //DataTablesModule,
=======
    DataTablesModule,
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682
  ],
  declarations: [ColecaoComponent],
})
export class ColecaoModule {}
