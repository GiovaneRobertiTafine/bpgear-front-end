import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { M1Page } from './pages/m1/m1.page';
import { M2Page } from './pages/m2/m2.page';
import { M3Page } from './pages/m3/m3.page';

const routes: Routes = [
    {
        path: 'm1',
        component: M1Page
    },
    {
        path: 'm2',
        component: M2Page
    },
    {
        path: 'm3',
        component: M3Page
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PesquisaRoutingModule { }
