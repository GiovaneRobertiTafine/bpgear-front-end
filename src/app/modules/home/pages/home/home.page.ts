import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
    selector: 'bpgear-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

    constructor(public toastService: ToastService) { }

    ngOnInit(): void {
    }

    testToast(): void {
        this.toastService.error('I am a success toast sd s  jsdhskjhdskjh s skdh skjh s skjdhsjkh k skjh khdsjkh ks dhk');
    }

}
