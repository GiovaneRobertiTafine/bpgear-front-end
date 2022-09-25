import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'transformValue'
})
export class TransformValuePipe implements PipeTransform {
    private readonly dataTransformValue: { [index: string]: {}; } = {
        'acao-alterar-pesquisa': {
            ATIVADA: "Desativar",
            DESATIVADA: "Ativar",
            0: "Desativar",
            1: "Ativar"
        },
    };

    transform(value: any, args: string): unknown {
        return this.dataTransformValue?.[args]?.[value] ?? value;
    }

}
