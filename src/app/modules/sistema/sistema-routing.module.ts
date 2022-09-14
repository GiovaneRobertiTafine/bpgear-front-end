import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { TokenGuardService } from '../auth/services/token-guard.service';
import { ClienteCriarPage } from './pages/cliente-criar/cliente-criar.page';
import { ClientePage } from './pages/cliente/cliente.page';
import { ColaboradorCriarPage } from './pages/colaborador-criar/colaborador-criar.page';
import { ColaboradorPage } from './pages/colaborador/colaborador.page';
import { EmpresaPage } from './pages/empresa/empresa.page';
import { MercadoPage } from './pages/mercado/mercado.page';
import { SetorPage } from './pages/setor/setor.page';
import { ValorPage } from './pages/valor/valor.page';
import { ClienteGuard } from './services/cliente.guard';
import { ColaboradorCriarGuardService } from './services/colaborador-criar-guard.service';
import { EmpresaGuardService } from './services/empresa-guard.service';
import { LayoutTemplate } from './templates/layout/layout.template';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'empresa' },
    {
        path: '',
        component: LayoutTemplate,
        canActivate: [AuthGuardService, TokenGuardService],
        canActivateChild: [AuthGuardService, TokenGuardService],
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
            {
                path: 'cliente/:id',
                component: ClientePage,
                data: { title: "Clientes" },
                canActivate: [EmpresaGuardService]
            },
            {
                path: 'mercado/:id',
                component: MercadoPage,
                data: { title: "Mercados" },
                canActivate: [EmpresaGuardService]
            },
            {
                path: 'valor/:id',
                component: ValorPage,
                data: { title: "Valores" },
                canActivate: [EmpresaGuardService]
            },
            {
                path: 'setor/:id',
                component: SetorPage,
                data: { title: "Setores" },
                canActivate: [EmpresaGuardService]
            }
        ]
    },
    {
        path: 'colaborador-criar',
        component: ColaboradorCriarPage,
        canActivate: [ColaboradorCriarGuardService]
    },
    {
        path: 'cliente-criar',
        component: ClienteCriarPage,
        canActivate: [ClienteGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SistemaRoutingModule { }
