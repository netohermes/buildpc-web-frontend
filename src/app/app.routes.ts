import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ComponenteDetalhe } from './pages/componente-detalhe/componente-detalhe';
import { Admin } from './pages/admin/admin';


export const routes: Routes = [

    { path: '', component: Home },


    { path: 'componente/:id', component: ComponenteDetalhe },


    { path: 'admin', component: Admin },
    { path: '**', redirectTo: '' }
];
