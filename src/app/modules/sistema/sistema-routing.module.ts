import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { LayoutPage } from './pages/layout/layout.page';

const routes: Routes = [
    {
        path: '',
        component: LayoutPage,
        canActivate: [AuthGuardService]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SistemaRoutingModule { }
