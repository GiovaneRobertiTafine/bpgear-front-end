import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';

import { LayoutTemplate } from './templates/layout/layout.template';
import { EmpresasPage } from './pages/empresas/empresas.page';

@NgModule({
    declarations: [
        LayoutTemplate,
        EmpresasPage
    ],
    imports: [
        CommonModule,
        SistemaRoutingModule
    ]
})
export class SistemaModule { }
