import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'bpgear-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    host: { 'class': 'toast-container position-fixed bottom-0 end-0 p-3', 'style': 'z-index: 1200' }
})
export class ToastComponent implements OnInit {
    iconClose = faXmark;

    constructor(public toastService: ToastService) { }

    ngOnInit(): void {
    }


    isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

}
