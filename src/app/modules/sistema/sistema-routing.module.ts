import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { TokenGuardService } from '../auth/services/token-guard.service';
import { ColaboradorCriarPage } from './pages/colaborador-criar/colaborador-criar.page';
import { ColaboradorPage } from './pages/colaborador/colaborador.page';
import { EmpresaPage } from './pages/empresa/empresa.page';
import { EmpresaGuardService } from './services/empresa-guard.service';
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
                data: { title: "Empresas" },
            },
            {
                path: 'colaborador/:id',
                component: ColaboradorPage,
                data: { title: "Colaboradores" },
                canActivate: [EmpresaGuardService],
            },
        ]
    },
    {
        path: 'colaborador-criar',
        component: ColaboradorCriarPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SistemaRoutingModule { }
