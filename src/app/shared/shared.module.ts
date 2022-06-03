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
import { InjectorPipe } from './pipes/injector.pipe';
import { MaskPipe } from 'ngx-mask';
import { TelefonePipe } from './pipes/telefone.pipe';

@NgModule({
    declarations: [
        InputPasswordComponent,
        ToastComponent,
        SpinnerComponent,
        TableComponent,
        InjectorPipe,
        TelefonePipe,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
    ],
    exports: [
        InputPasswordComponent,
        ToastComponent,
        SpinnerComponent,
        TableComponent,
    ],
    providers: [
        InjectorPipe,
        MaskPipe,
        TelefonePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})
export class SharedModule { }
