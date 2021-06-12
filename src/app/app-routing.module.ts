import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'listaeditora',
      loadChildren: () => import('./cadastro/listaeditora.module').then((m) => m.ListaEditoraModule),
    },
    { path: 'detail', loadChildren: () => import('./detail/detail.module').then((m) => m.DetailModule) },
    { path: 'hq', loadChildren: () => import('./cadastro/hq.module').then((m) => m.HQModule) },
    { path: 'listahq', loadChildren: () => import('./cadastro/listahq.module').then((m) => m.ListaHQModule) },
    { path: 'editora', loadChildren: () => import('./cadastro/editora.module').then((m) => m.EditoraModule) },
    { path: 'frases', loadChildren: () => import('./frases/frases.module').then((m) => m.FrasesModule) },
    { path: '', loadChildren: () => import('./cadastro/listahq.module').then((m) => m.ListaHQModule) },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/listahq', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}