import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';

import { LayoutTemplate } from './templates/layout/layout.template';
import { EmpresaPage } from './pages/empresa/empresa.page';

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
