import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

    transform(value: any): string {
        let str = value + '';

        str = str.replace(/\D/g, '');
        switch (str.length) {
            case 11:
                str = str.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
                break;

            case 10:
                str = str.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                break;

            case 12:
                str = str.replace(/^(\d{2})(\d{2})(\d{4})(\d{4})/, '+$1 ($2) $3-$4');
                break;

            case 13:
                str = str.replace(
                    /^(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})/,
                    '+$1 ($2) $3 $4-$5'
                );
                break;

            default:
                break;
        }

        return str;
    }

}
