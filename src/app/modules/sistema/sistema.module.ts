import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';

import { LayoutTemplate } from './templates/layout/layout.template';

@NgModule({
    declarations: [
        LayoutTemplate
    ],
    imports: [
        CommonModule,
        SistemaRoutingModule
    ]
})
export class SistemaModule { }
