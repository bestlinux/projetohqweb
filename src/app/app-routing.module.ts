import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { LoginComponent } from './login/login.component';
import { ExitComponent } from './login/exit.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'listaeditora',
      loadChildren: () => import('./cadastro/listaeditora.module').then((m) => m.ListaEditoraModule),
    },
    { path: 'listahqavancado', loadChildren: () => import('./cadastro/listahqavancado.module').then((m) => m.ListaHQAvancadoModule) },
    { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
    { path: 'detail', loadChildren: () => import('./detail/detail.module').then((m) => m.DetailModule) },
    { path: 'hq', loadChildren: () => import('./cadastro/hq.module').then((m) => m.HQModule) },
    { path: 'listahq', loadChildren: () => import('./cadastro/listahq.module').then((m) => m.ListaHQModule) },
    { path: 'editora', loadChildren: () => import('./cadastro/editora.module').then((m) => m.EditoraModule) },
    { path: 'frases', loadChildren: () => import('./frases/frases.module').then((m) => m.FrasesModule) },
    { path: '', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
    { path: 'login', component: LoginComponent },
    { path: 'sair', component: ExitComponent },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
