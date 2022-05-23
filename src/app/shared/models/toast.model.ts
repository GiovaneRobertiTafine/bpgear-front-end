import { TemplateRef } from "@angular/core";

export interface Toast {
    bodyMessage: string | TemplateRef<any>;
    className?: string;
    delay?: number;
}