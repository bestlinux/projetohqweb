import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { ColecaoComponent } from './colecao.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: ColecaoComponent, data: { title: marker('Colecao') } },
  { path: ':id', component: ColecaoComponent, data: { title: marker('Colecao') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ColecaoRoutingModule {}