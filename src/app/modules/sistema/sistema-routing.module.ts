import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { TokenGuardService } from '../auth/services/token-guard.service';
import { EmpresasPage } from './pages/empresas/empresas.page';
import { LayoutTemplate } from './templates/layout/layout.template';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'empresas' },
    {
        path: '',
        component: LayoutTemplate,
        canActivate: [AuthGuardService, TokenGuardService],
        children: [
            {
                path: 'empresas',
                component: EmpresasPage,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SistemaRoutingModule { }
