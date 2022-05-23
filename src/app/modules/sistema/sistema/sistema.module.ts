import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';

import { LayoutPage } from '../pages/layout/layout.page';

@NgModule({
    declarations: [
        LayoutPage
    ],
    imports: [
        CommonModule,
        SistemaRoutingModule
    ]
})
export class SistemaModule { }
