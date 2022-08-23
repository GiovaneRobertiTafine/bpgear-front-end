import { Component, ElementRef, forwardRef, Input, OnInit, Optional, Renderer2, Self, SkipSelf, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DataInputDropdownConfig } from '../../models/data-input-dropdown-config.model';

@Component({
    selector: 'bpgear-input-dropdown-auto-complete',
    templateUrl: './input-dropdown-auto-complete.component.html',
    styleUrls: ['./input-dropdown-auto-complete.component.scss'],
    viewProviders: [{
        provide: ControlContainer,
        useFactory: (container: ControlContainer) => container,
        deps: [[new SkipSelf(), ControlContainer]],
    }]
})
export class InputDropdownAutoCompleteComponent implements OnInit {
    @Input() name: string = '';
    @Input() classes: string[] = [];
    @Input() itens: any[] = [];
    itensRef: any[] = [];
    @Input() dataInputDropdownConfig: DataInputDropdownConfig;
    @Input() controlName: string;

    constructor() {

    }

    ngOnInit(): void {
        this.itensRef = this.itens;
    }

    configPropertyView(item: any): string {
        let valueView: string = '';
        if (this.dataInputDropdownConfig) {
            this.dataInputDropdownConfig.itens.forEach((value, index, array) => {
                if (value.titulo) {
                    valueView += value.titulo + ': ' + item[value.propriedade.join('.')];
                } else {
                    valueView += item[value.propriedade.join('.')];
                }
                if (index !== array.length - 1) {
                    valueView += ' - ';
                }
            });
            return valueView;
        } else {
            return item;
        }
    }


    searchItem(valueSearch: string): void {
        if (valueSearch.length) {
            this.itensRef = [];
            this.itens.forEach((value) => {
                const valueItem = value[this.dataInputDropdownConfig.propertySearch.join('.')] as string;
                if (valueItem.toLocaleLowerCase().search(valueSearch.toLocaleLowerCase()) !== -1) {
                    this.itensRef.push(value);
                }
            });
        } else {
            this.itensRef = this.itens;
        }
    }


}
