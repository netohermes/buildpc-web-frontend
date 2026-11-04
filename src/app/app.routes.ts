import { Routes } from '@angular/router';


export const routes: Routes = [

    { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },


    { path: 'montador', loadComponent: () => import('./pages/montador/montador').then(m => m.Montador) },


    { path: 'componente/:id', loadComponent: () => import('./pages/componente-detalhe/componente-detalhe').then(m => m.ComponenteDetalhe) },


    { path: 'produtos-prontos', loadComponent: () => import('./pages/produtos-prontos/produtos-prontos').then(m => m.ProdutosProntos) },
    { path: 'admin', loadComponent: () => import('./pages/admin/admin').then(m => m.Admin) },
    { path: '**', redirectTo: '' }
];