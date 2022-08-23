import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cliente } from '../../models/interfaces/cliente.interface';

@Component({
    selector: 'bpgear-cliente-criar',
    templateUrl: './cliente-criar.page.html',
    styleUrls: ['./cliente-criar.page.scss']
})
export class ClienteCriarPage implements OnInit {
    private helper = new JwtHelperService();
    // form: NgTypeFormGroup<ColaboradorCriar>;
    cliente: Cliente;

    constructor() { }

    ngOnInit(): void {
    }

}
