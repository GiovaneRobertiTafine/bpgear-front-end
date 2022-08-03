import { Component, OnInit } from '@angular/core';
import { ClienteDataViewConfig } from '../../models/constants/sistema-data-view-config.constant';

@Component({
    selector: 'bpgear-cliente',
    templateUrl: './cliente.page.html',
    styleUrls: ['./cliente.page.scss']
})
export class ClientePage implements OnInit {

    clienteDataViewConfig = ClienteDataViewConfig;
    constructor() { }

    ngOnInit(): void {
    }

}
