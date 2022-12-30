import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';

import { LayoutTemplate } from './templates/layout/layout.template';
import { EmpresaPage } from './pages/empresa/empresa.page';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ModalEmpresaCriarComponent } from './components/modal-empresa-criar/modal-empresa-criar.component';
import { ModalEmpresaEditarComponent } from './components/modal-empresa-editar/modal-empresa-editar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SectionUserComponent } from './components/section-user/section-user.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsTypedModule } from 'reactive-forms-typed';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColaboradorPage } from './pages/colaborador/colaborador.page';
import { ColaboradorCriarPage } from './pages/colaborador-criar/colaborador-criar.page';
import { TransformValuePipe } from './pipes/transform-value.pipe';
import { ModalColaboradorCriarEmailComponent } from './components/modal-colaborador-criar-email/modal-colaborador-criar-email.component';
import { ClientePage } from './pages/cliente/cliente.page';
import { MercadoPage } from './pages/mercado/mercado.page';
import { ModalMercadoCriarComponent } from './components/modal-mercado-criar/modal-mercado-criar.component';
import { ModalMercadoEditarComponent } from './components/modal-mercado-editar/modal-mercado-editar.component';
import { ClienteCriarPage } from './pages/cliente-criar/cliente-criar.page';
import { ModalAlterarPesquisaComponent } from './components/modal-alterar-pesquisa/modal-alterar-pesquisa.component';
import { ModalDeletarComponent } from './components/modal-deletar/modal-deletar.component';
import { ModalDetalharComponent } from './components/modal-detalhar/modal-detalhar.component';
import { ModalClienteCriarEmailComponent } from './components/modal-cliente-criar-email/modal-cliente-criar-email.component';
import { ModalClienteEditarComponent } from './components/modal-cliente-editar/modal-cliente-editar.component';
import { ValorPage } from './pages/valor/valor.page';
import { ModalValorCriarComponent } from './components/modal-valor-criar/modal-valor-criar.component';
import { ModalValorEditarComponent } from './components/modal-valor-editar/modal-valor-editar.component';
import { SetorPage } from './pages/setor/setor.page';
import { ModalSetorCriarComponent } from './components/modal-setor-criar/modal-setor-criar.component';
import { ModalSetorEditarComponent } from './components/modal-setor-editar/modal-setor-editar.component';
import { BemServicoPage } from './pages/bem-servico/bem-servico.page';
import { ModalBemServicoCriarComponent } from './components/modal-bem-servico-criar/modal-bem-servico-criar.component';
import { ModalBemServicoEditarComponent } from './components/modal-bem-servico-editar/modal-bem-servico-editar.component';
import { ModalClienteCriarComponent } from './components/modal-cliente-criar/modal-cliente-criar.component';
import { ModalColaboradorCriarComponent } from './components/modal-colaborador-criar/modal-colaborador-criar.component';
import { RelatoriosPage } from './pages/relatorios/relatorios.page';
@NgModule({
    declarations: [
        LayoutTemplate,
        EmpresaPage,
        ModalEmpresaCriarComponent,
        ModalEmpresaEditarComponent,
        NavBarComponent,
        SectionUserComponent,
        SideBarComponent,
        ColaboradorPage,
        ColaboradorCriarPage,
        TransformValuePipe,
        ModalColaboradorCriarEmailComponent,
        ClientePage,
        MercadoPage,
        ModalMercadoCriarComponent,
        ModalMercadoEditarComponent,
        ClienteCriarPage,
        ModalAlterarPesquisaComponent,
        ModalDeletarComponent,
        ModalDetalharComponent,
        ModalClienteCriarEmailComponent,
        ModalClienteEditarComponent,
        ValorPage,
        ModalValorCriarComponent,
        ModalValorEditarComponent,
        SetorPage,
        ModalSetorCriarComponent,
        ModalSetorEditarComponent,
        BemServicoPage,
        ModalBemServicoCriarComponent,
        ModalBemServicoEditarComponent,
        ModalClienteCriarComponent,
        ModalColaboradorCriarComponent,
        RelatoriosPage,
    ],
    imports: [
        CommonModule,
        SistemaRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        NgxMaskModule,
        ReactiveFormsTypedModule,
        FontAwesomeModule,
        NgScrollbarModule,
        NgbModule,
    ],
    providers: [
        TransformValuePipe
    ]
})
export class SistemaModule { }
