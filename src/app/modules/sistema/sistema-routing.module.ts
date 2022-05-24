import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { TokenGuardService } from '../auth/services/token-guard.service';
import { LayoutTemplate } from './templates/layout/layout.template';

const routes: Routes = [
    {
        path: '',
        component: LayoutTemplate,
        canActivate: [AuthGuardService, TokenGuardService]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SistemaRoutingModule { }
