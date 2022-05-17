import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputPasswordComponent } from './components/input-password/input-password.component';

@NgModule({
    declarations: [
        InputPasswordComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        InputPasswordComponent
    ]
})
export class SharedModule { }
