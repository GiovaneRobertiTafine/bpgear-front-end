import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';

import { LayoutTemplate } from './templates/layout/layout.template';
import { EmpresaPage } from './pages/empresa/empresa.page';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from '../auth/services/token.interceptor';

@NgModule({
    declarations: [
        LayoutTemplate,
        EmpresaPage
    ],
    imports: [
        CommonModule,
        SistemaRoutingModule
    ]
})
export class SistemaModule { }
