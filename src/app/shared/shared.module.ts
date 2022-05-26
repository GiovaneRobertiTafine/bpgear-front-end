import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InputPasswordComponent } from './components/input-password/input-password.component';
import { ToastComponent } from './components/toast/toast.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TableComponent } from './components/table/table.component';

import { TokenInterceptor } from '../modules/auth/services/token.interceptor';

@NgModule({
    declarations: [
        InputPasswordComponent,
        ToastComponent,
        SpinnerComponent,
        TableComponent
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
        ToastComponent,
        SpinnerComponent,
        TableComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})
export class SharedModule { }
