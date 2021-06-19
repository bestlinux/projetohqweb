import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { HQComponent } from './hq.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: HQComponent, data: { title: marker('Adicionar HQ') } },
  { path: ':id', component: HQComponent, data: { title: marker('Editar HQ') } },
  { path: ':id/:titulo', component: HQComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HQRoutingModule {}
