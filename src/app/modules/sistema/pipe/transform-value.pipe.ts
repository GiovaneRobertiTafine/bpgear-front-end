import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'transformValue'
})
export class TransformValuePipe implements PipeTransform {
    private dataTransformValue: { [index: string]: {}; } = {
        'colaborador-tabela-pesquisa': {
            false: 'Desativada',
            true: 'Ativada'
        }
    };

    transform(value: string, args: string): unknown {
        return this.dataTransformValue[args][value];
    }

}
