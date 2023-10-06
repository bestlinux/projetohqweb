import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { HomeComponent } from './home.component';
<<<<<<< HEAD
import { Shell } from '../shell/shell.service';
=======
import { Shell } from '@app/shell/shell.service';
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682

const routes: Routes = [
  Shell.childRoutes([{ path: 'home', component: HomeComponent, data: { title: marker('Home') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
