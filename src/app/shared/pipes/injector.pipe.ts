import { Injector, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'injector'
})
export class InjectorPipe implements PipeTransform {
    constructor(private injector: Injector) { }
    transform(value: any, token: Object, pipeArg?: string): string {
        if (!token) {
            return value;
        } else {
            const pipe = this.injector.get(token);
            return pipe.transform(value, pipeArg);
        }
    }

}
