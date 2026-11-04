import { Routes } from '@angular/router';


export const routes: Routes = [

    { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },


    { path: 'componente/:id', loadComponent: () => import('./pages/componente-detalhe/componente-detalhe').then(m => m.ComponenteDetalhe) },


    { path: 'admin', loadComponent: () => import('./pages/admin/admin').then(m => m.Admin) },
    { path: '**', redirectTo: '' }
];