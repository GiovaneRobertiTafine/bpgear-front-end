import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
    { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
    { path: 'sistema', loadChildren: () => import('./modules/sistema/sistema.module').then(m => m.SistemaModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
