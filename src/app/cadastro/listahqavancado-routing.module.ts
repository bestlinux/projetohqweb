import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { ListaHQAvancadoComponent } from './listahqavancado.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: ListaHQAvancadoComponent, data: { title: marker('Lista Avancado HQ') } },
  { path: ':id', component: ListaHQAvancadoComponent, data: { title: marker('Lista Avancado HQ') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ListaHQAvancadoRoutingModule {}
