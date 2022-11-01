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
@NgModule({
    declarations: [
        M1Page
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
