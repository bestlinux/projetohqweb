import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

<<<<<<< HEAD
import { SharedModule } from '../@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
=======
import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DataTablesModule } from 'angular-datatables';
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    CommonModule,
    TranslateModule,
    SharedModule,
    HomeRoutingModule,
<<<<<<< HEAD
=======
    DataTablesModule,
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
