import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '@env/environment';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
//import { MasterModule } from './master/master.module';
import { ShellModule } from './shell/shell.module';
import { ListaHQModule } from './cadastro/listahq.module';
import { ListaEditoraModule } from './cadastro/listaeditora.module';
//import { EditoraModule } from './cadastro/editora.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  //IMPORTANTE: A ORDEM DA IMPORTACAO DO MODULOS AFETA A ROTA DAS PAGINAS
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    ListaHQModule,
    ListaEditoraModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
    MatSliderModule,
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
