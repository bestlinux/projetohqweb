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
    { path: 'listadesejo', loadChildren: () => import('./cadastro/listadesejo.module').then((m) => m.ListaDesejoModule) },
    { path: 'listaleitura', loadChildren: () => import('./cadastro/listaleitura.module').then((m) => m.ListaLeituraModule) },
    { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
    { path: 'hq', loadChildren: () => import('./cadastro/hq.module').then((m) => m.HQModule) },
    { path: 'listahq', loadChildren: () => import('./cadastro/listahq.module').then((m) => m.ListaHQModule) },
    { path: 'editora', loadChildren: () => import('./cadastro/editora.module').then((m) => m.EditoraModule) },
    { path: 'frases', loadChildren: () => import('./frases/frases.module').then((m) => m.FrasesModule) },
    { path: 'colecao', loadChildren: () => import('./colecao/colecao.module').then((m) => m.ColecaoModule) },
    { path: '', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'sair', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
