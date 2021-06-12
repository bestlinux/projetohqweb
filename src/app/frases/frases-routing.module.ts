import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { FrasesComponent } from './frases.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: FrasesComponent, data: { title: marker('Frases') } },
  { path: ':id', component: FrasesComponent, data: { title: marker('Frases') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class FrasesRoutingModule {}
