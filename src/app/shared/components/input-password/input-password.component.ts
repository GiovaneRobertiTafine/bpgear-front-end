import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'bpgear-input-password',
    templateUrl: './input-password.component.html',
    styleUrls: ['./input-password.component.scss'],
    viewProviders: [
        {
            provide: ControlContainer,
            useExisting: FormGroupDirective
        }
    ]
})
export class InputPasswordComponent implements OnInit {
    iconEye = faEyeSlash;
    @Input() controlName: string = "";
    @Input() name: string = "";
    @Input() classes: string[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    viewPassword(inputPassword: HTMLInputElement): void {
        if (inputPassword.getAttribute("type") === "text") {
            this.iconEye = faEyeSlash;
            inputPassword.setAttribute("type", "password");
            inputPassword.focus();
        } else {
            this.iconEye = faEye;
            inputPassword.setAttribute("type", "text");
            inputPassword.focus();
        }
    }

}
