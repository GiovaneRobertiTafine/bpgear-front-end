import { Injectable, TemplateRef } from '@angular/core';
import { Toast } from '../models/toast.model';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    toasts: any[] = [];

    constructor() { }

    success(textOrTpl: string | TemplateRef<any>) {
        this.toasts.push({ textOrTpl, className: "bg-success text-light" });
    }

    error(textOrTpl: string | TemplateRef<any>) {
        this.toasts.push({ textOrTpl, className: "bg-danger text-light" });
    }

    warning(textOrTpl: string | TemplateRef<any>) {
        this.toasts.push({ textOrTpl, className: "bg-warning" });
    }

    remove(toast) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

    clear() {
        this.toasts.splice(0, this.toasts.length);
    }
}
