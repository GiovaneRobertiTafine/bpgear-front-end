import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
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
export class InputPasswordComponent implements OnInit, AfterViewInit {
    iconEye = faEyeSlash;
    @Input() controlName: string = "";
    @Input() name: string = "";
    @Input() classes: string[] = [];
    @Input() viewFocus: boolean = false;
    @ViewChild('inputPassword') inputPassword: HTMLInputElement;

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        if (this.viewFocus) {
            this.inputPassword['nativeElement'].addEventListener('blur', () => {
                this.iconEye = faEyeSlash;
                this.inputPassword['nativeElement'].setAttribute("type", "password");
            });
        }

    }

    setType(): void {
        console.log(this.inputPassword);
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
