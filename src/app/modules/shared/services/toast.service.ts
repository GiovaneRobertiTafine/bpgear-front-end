import { Injectable, TemplateRef } from '@angular/core';
import { Toast } from '../models/toast.model';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    toasts: any[] = [];

    constructor() { }

    success(textOrTpl: string | TemplateRef<any>, delay: number = 5000) {
        this.toasts.push({ textOrTpl, className: "bg-success text-light", delay: delay });
    }

    error(textOrTpl: string | TemplateRef<any>, delay: number = 5000) {
        this.toasts.push({ textOrTpl, className: "bg-danger text-light", delay: delay });
    }

    warning(textOrTpl: string | TemplateRef<any>, delay: number = 5000) {
        this.toasts.push({ textOrTpl, className: "bg-warning", delay: delay });
    }

    remove(toast) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

    clear() {
        this.toasts.splice(0, this.toasts.length);
    }
}
