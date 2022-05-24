import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'bpgear-layout',
    templateUrl: './layout.template.html',
    styleUrls: ['./layout.template.scss']
})
export class LayoutTemplate implements OnInit {

    constructor(public authService: AuthService) { }

    ngOnInit(): void {
    }

}
