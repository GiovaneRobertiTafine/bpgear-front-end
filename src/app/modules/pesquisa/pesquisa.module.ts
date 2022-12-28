import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PesquisaRoutingModule } from './pesquisa-routing.module';
import { M1Page } from './pages/m1/m1.page';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsTypedModule } from 'reactive-forms-typed';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { M2Page } from './pages/m2/m2.page';
import { M3Page } from './pages/m3/m3.page';
@NgModule({
    declarations: [
        M1Page,
        M2Page,
        M3Page
    ],
    imports: [
        CommonModule,
        PesquisaRoutingModule,
        NgScrollbarModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ReactiveFormsTypedModule,
        FontAwesomeModule,
        NgbModule
    ]
})
export class PesquisaModule { }
