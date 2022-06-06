import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';

import { LayoutTemplate } from './templates/layout/layout.template';
import { EmpresaPage } from './pages/empresa/empresa.page';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from '../auth/services/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';

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

@NgModule({
    declarations: [
        LayoutTemplate,
        EmpresaPage,
        ModalEmpresaCriarComponent,
        ModalEmpresaEditarComponent,
        ModalEmpresaDeletarComponent,
        NavBarComponent,
        SectionUserComponent,
        SideBarComponent
    ],
    imports: [
        CommonModule,
        SistemaRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        NgxMaskModule,
        ReactiveFormsTypedModule,
        FontAwesomeModule,
        NgScrollbarModule
    ]
})
export class SistemaModule { }
