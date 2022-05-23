import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPage } from '../pages/layout/layout.page';

const routes: Routes = [
    { path: 'sistema', pathMatch: 'full', redirectTo: 'sistema/empresas' },
    {
        path: '',
        component: LayoutPage,
        children: [

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SistemaRoutingModule { }
