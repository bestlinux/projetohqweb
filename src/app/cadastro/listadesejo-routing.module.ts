import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { ListaDesejoComponent } from './listadesejo.component';
<<<<<<< HEAD
import { Shell } from '../shell/shell.service';
=======
import { Shell } from '@app/shell/shell.service';
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682

/*const routes: Routes = [
  Shell.childRoutes([
    //{ path: '', redirectTo: '/listahq', pathMatch: 'full' },
    { path: '', component: ListaHQComponent, data: { title: marker('Lista de HQs') } },
  ]),
];*/
const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: ListaDesejoComponent, data: { title: marker('Lista de Desejos') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ListaDesejoRoutingModule {}
