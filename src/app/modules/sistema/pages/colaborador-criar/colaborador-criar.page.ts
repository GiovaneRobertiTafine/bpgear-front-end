import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    selector: 'bpgear-colaborador-criar',
    templateUrl: './colaborador-criar.page.html',
    styleUrls: ['./colaborador-criar.page.scss']
})
export class ColaboradorCriarPage implements OnInit {
    private helper = new JwtHelperService();
    nomeEmpresa = '';
    cnpj = '';
    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        console.log(this.helper.decodeToken(this.route.snapshot.queryParamMap.get('access_token')));
        this.nomeEmpresa = this.helper.decodeToken(this.route.snapshot.queryParamMap.get('access_token')).name;
        this.cnpj = this.helper.decodeToken(this.route.snapshot.queryParamMap.get('access_token')).certserialnumber;
    }

}
