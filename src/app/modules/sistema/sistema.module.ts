import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';

import { LayoutTemplate } from './templates/layout/layout.template';
import { EmpresaPage } from './pages/empresa/empresa.page';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { ModalEmpresaCriarComponent } from './components/modal-empresa-criar/modal-empresa-criar.component';
import { ModalEmpresaEditarComponent } from './components/modal-empresa-editar/modal-empresa-editar.component';
import { ModalEmpresaDeletarComponent } from './components/modal-empresa-deletar/modal-empresa-deletar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SectionUserComponent } from './components/section-user/section-user.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsTypedModule } from 'reactive-forms-typed';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColaboradorPage } from './pages/colaborador/colaborador.page';
import { ModalColaboradorCriarComponent } from './components/modal-colaborador-criar/modal-colaborador-criar.component';
import { ColaboradorCriarPage } from './pages/colaborador-criar/colaborador-criar.page';
import { TransformValuePipe } from './pipe/transform-value.pipe';
import { ModalColaboradorDeletarComponent } from './components/modal-colaborador-deletar/modal-colaborador-deletar.component';
import { ModalColaboradorEditarComponent } from './components/modal-colaborador-editar/modal-colaborador-editar.component';
import { ClientePage } from './pages/cliente/cliente.page';
import { ModalClienteCriarComponent } from './components/modal-cliente-criar/modal-cliente-criar.component';
import { MercadoPage } from './pages/mercado/mercado.page';
import { ModalMercadoCriarComponent } from './components/modal-mercado-criar/modal-mercado-criar.component';
import { ModalMercadoDeletarComponent } from './components/modal-mercado-deletar/modal-mercado-deletar.component';
import { ModalMercadoEditarComponent } from './components/modal-mercado-editar/modal-mercado-editar.component';
import { ClienteCriarPage } from './pages/cliente-criar/cliente-criar.page';
import { ModalClienteDeletarComponent } from './components/modal-cliente-deletar/modal-cliente-deletar.component';
import { AlterarPesquisaComponent } from './components/alterar-pesquisa/alterar-pesquisa.component';
@NgModule({
    declarations: [
        LayoutTemplate,
        EmpresaPage,
        ModalEmpresaCriarComponent,
        ModalEmpresaEditarComponent,
        ModalEmpresaDeletarComponent,
        NavBarComponent,
        SectionUserComponent,
        SideBarComponent,
        ColaboradorPage,
        ModalColaboradorCriarComponent,
        ColaboradorCriarPage,
        TransformValuePipe,
        ModalColaboradorDeletarComponent,
        ModalColaboradorEditarComponent,
        ClientePage,
        ModalClienteCriarComponent,
        MercadoPage,
        ModalMercadoCriarComponent,
        ModalMercadoDeletarComponent,
        ModalMercadoEditarComponent,
        ClienteCriarPage,
        ModalClienteDeletarComponent,
        AlterarPesquisaComponent,
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
