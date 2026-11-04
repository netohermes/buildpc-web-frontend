import { Routes } from '@angular/router';


export const routes: Routes = [

    { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },


    { path: 'montador', loadComponent: () => import('./pages/montador/montador').then(m => m.Montador) },


    { path: 'componente/:id', loadComponent: () => import('./pages/componente-detalhe/componente-detalhe').then(m => m.ComponenteDetalhe) },


    { path: 'produtos-prontos', loadComponent: () => import('./pages/produtos-prontos/produtos-prontos').then(m => m.ProdutosProntos) },


    { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },


    { path: 'admin', loadComponent: () => import('./pages/admin/admin').then(m => m.Admin) },


    { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard) },


    { path: '**', redirectTo: '' }
];