import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'bpgear-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
    public loginForm = this.fb.group({
        usuario: [''],
        senha: [''],
    });

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        console.log(this.loginForm);
    }

}
