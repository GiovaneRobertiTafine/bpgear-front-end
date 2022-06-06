import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Perfil } from 'src/app/modules/auth/models/enums/perfil.enum';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'bpgear-section-user',
    templateUrl: './section-user.component.html',
    styleUrls: ['./section-user.component.scss']
})
export class SectionUserComponent implements OnInit {
    iconUser = faUser;
    perfil = Perfil;

    constructor(public authService: AuthService) { }

    ngOnInit(): void {
    }

}
