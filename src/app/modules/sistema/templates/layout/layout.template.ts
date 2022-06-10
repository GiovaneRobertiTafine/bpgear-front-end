import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/interfaces/empresa.interface';
import { EmpresaService } from '../../services/empresa.service';
@Component({
    selector: 'bpgear-layout',
    templateUrl: './layout.template.html',
    styleUrls: ['./layout.template.scss']
})
export class LayoutTemplate implements OnInit {
    empresa: Empresa = null;
    constructor(
        private empresaService: EmpresaService
    ) { }

    ngOnInit(): void {
        this.empresaService.getEmpresa()
            .subscribe(response => {
                this.empresa = response;
            });

    }

}
