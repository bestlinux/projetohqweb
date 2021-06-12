import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { EditoraComponent } from './editora.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: EditoraComponent, data: { title: marker('Editora') } },
  { path: ':id', component: EditoraComponent, data: { title: marker('Editora') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class EditoraRoutingModule {}
