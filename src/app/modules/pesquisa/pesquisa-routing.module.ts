import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { M1Page } from './pages/m1/m1.page';

const routes: Routes = [
    {
        path: 'm1',
        component: M1Page
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PesquisaRoutingModule { }
