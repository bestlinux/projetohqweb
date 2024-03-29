import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { ListaHQComponent } from './listahq.component';
import { Shell } from '../shell/shell.service';

/*const routes: Routes = [
  Shell.childRoutes([
    //{ path: '', redirectTo: '/listahq', pathMatch: 'full' },
    { path: '', component: ListaHQComponent, data: { title: marker('Lista de HQs') } },
  ]),
];*/
const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: ListaHQComponent, data: { title: marker('Lista de HQs') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ListaHQRoutingModule {}
