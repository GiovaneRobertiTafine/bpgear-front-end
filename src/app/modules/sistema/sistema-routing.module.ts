import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BemServicoPage } from './pages/bem-servico/bem-servico.page';
import { ClienteCriarPage } from './pages/cliente-criar/cliente-criar.page';
import { ClientePage } from './pages/cliente/cliente.page';
import { ColaboradorCriarPage } from './pages/colaborador-criar/colaborador-criar.page';
import { ColaboradorPage } from './pages/colaborador/colaborador.page';
import { EmpresaPage } from './pages/empresa/empresa.page';
import { MercadoPage } from './pages/mercado/mercado.page';
import { SetorPage } from './pages/setor/setor.page';
import { ValorPage } from './pages/valor/valor.page';
import { EmpresaGuard } from './services/guards/empresa.guard';
import { LayoutTemplate } from './templates/layout/layout.template';
import { ColaboradorCriarGuard } from './services/guards/colaborador-criar.guard';
import { TokenGuard } from '../auth/services/guards/token.guard';
import { AuthGuard } from '../auth/services/guards/auth.guard';
import { ClienteCriarGuard } from './services/guards/cliente-criar.guard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'empresa' },
    {
        path: '',
        component: LayoutTemplate,
        canActivate: [AuthGuard, TokenGuard],
        canActivateChild: [AuthGuard, TokenGuard],
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
                canActivate: [EmpresaGuard],
            },
            {
                path: 'cliente/:id',
                component: ClientePage,
                data: { title: "Clientes" },
                canActivate: [EmpresaGuard]
            },
            {
                path: 'mercado/:id',
                component: MercadoPage,
                data: { title: "Mercados" },
                canActivate: [EmpresaGuard]
            },
            {
                path: 'valor/:id',
                component: ValorPage,
                data: { title: "Valores" },
                canActivate: [EmpresaGuard]
            },
            {
                path: 'setor/:id',
                component: SetorPage,
                data: { title: "Setores" },
                canActivate: [EmpresaGuard]
            },
            {
                path: 'bem-servico/:id',
                component: BemServicoPage,
                data: { title: "Bens e Serviços" },
                canActivate: [EmpresaGuard]
            }
        ]
    },
    {
        path: 'colaborador-criar',
        component: ColaboradorCriarPage,
        canActivate: [ColaboradorCriarGuard]
    },
    {
        path: 'cliente-criar',
        component: ClienteCriarPage,
        canActivate: [ClienteCriarGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SistemaRoutingModule { }
