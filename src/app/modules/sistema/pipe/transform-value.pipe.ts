import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'transformValue'
})
export class TransformValuePipe implements PipeTransform {
    private readonly dataTransformValue: { [index: string]: {}; } = {
        'acao-tabela-pesquisa': {
            ATIVADA: "Desativar",
            DESATIVADA: "Ativar"
        }
    };

    transform(value: string, args: string): unknown {
        return this.dataTransformValue?.[args]?.[value] ?? value;
    }

}
