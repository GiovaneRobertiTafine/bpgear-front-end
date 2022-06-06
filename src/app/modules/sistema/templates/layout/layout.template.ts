import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Perfil } from 'src/app/modules/auth/models/enums/perfil.enum';
@Component({
    selector: 'bpgear-layout',
    templateUrl: './layout.template.html',
    styleUrls: ['./layout.template.scss']
})
export class LayoutTemplate implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
