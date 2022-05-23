import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InputPasswordComponent } from './components/input-password/input-password.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
    declarations: [
        InputPasswordComponent,
        ToastComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule
    ],
    exports: [
        InputPasswordComponent,
        ToastComponent
    ]
})
export class SharedModule { }
