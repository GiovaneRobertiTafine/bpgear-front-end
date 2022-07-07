import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormTypeBuilder, NgTypeFormControlValidator, NgTypeFormGroup } from 'reactive-forms-typed';
import { Colaborador } from '../../models/interfaces/colaborador.interface';
import { ColaboradorCriar } from '../../models/requests/colaborador-criar.request';

@Component({
    selector: 'bpgear-colaborador-criar',
    templateUrl: './colaborador-criar.page.html',
    styleUrls: ['./colaborador-criar.page.scss']
})
export class ColaboradorCriarPage implements OnInit {
    private helper = new JwtHelperService();
    form: NgTypeFormGroup<ColaboradorCriar>;
    nomeEmpresa = '';
    cnpj = '';
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormTypeBuilder,
    ) { }

    ngOnInit(): void {
        this.nomeEmpresa = this.helper.decodeToken(this.route.snapshot.queryParamMap.get('access_token')).nomeEmpresa;
        this.cnpj = this.helper.decodeToken(this.route.snapshot.queryParamMap.get('access_token')).cnpj;

        if (this.helper.isTokenExpired(this.route.snapshot.queryParamMap.get('access_token'))) {
            this.router.navigate(['/']);
        }

        const colaborador = this.fb.group<ThisType<Colaborador & 'confimarSenha'>>({
            nomeCompleto: ["", [Validators.required]],
            email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]],
            usuario: ["", [Validators.required]],
            senha: ["", [Validators.required, Validators.minLength(10)]],
            confirmarSenha: ["",
                [Validators.required, (c: NgTypeFormControlValidator<string, Colaborador>) => {
                    if (c && c.parent && c.parent.value.senha === c.value) {
                        return null;
                    }
                    return { notMatch: true };
                }]
            ]
        });

        this.form = this.fb.group<ColaboradorCriar>({
            idEmpresa: [this.helper.decodeToken(this.route.snapshot.queryParamMap.get('access_token')).id],
            colaborador: colaborador
        });

        colaborador.setFormErrors({
            nomeCompleto: { required: "Nome Completo é requerido." },
            email: { required: "E-mail é requerido.", pattern: "E-mail inválido." },
            usuario: { required: "Usuário é requerido." },
            senha: { required: "Senha é requerida.", minlength: "Mínimo de 10 caracteres." },
            confirmarSenha: { required: "Confirmar Senha é requerido.", notMatch: "Senha diferente." }
        });
        console.log(colaborador.value);
    }

    get formGroup() { return this.form as FormGroup; }
    get formGroupColaborador() { return this.form.controls.colaborador as FormGroup; }
}
