import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPage } from './pages/login/login.page';

import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { TokenInterceptor } from './services/token.interceptor';


@NgModule({
    declarations: [
        LoginPage
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: AuthModule,
            providers: [
                // AuthInterceptor
            ]
        };
    }

}
