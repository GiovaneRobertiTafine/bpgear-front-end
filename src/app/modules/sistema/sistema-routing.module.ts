import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { TokenGuardService } from '../auth/services/token-guard.service';
import { EmpresaPage } from './pages/empresa/empresa.page';
import { LayoutTemplate } from './templates/layout/layout.template';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'empresa' },
    {
        path: '',
        component: LayoutTemplate,
        canActivate: [AuthGuardService, TokenGuardService],
        children: [
            {
                path: 'empresa',
                component: EmpresaPage,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SistemaRoutingModule { }
