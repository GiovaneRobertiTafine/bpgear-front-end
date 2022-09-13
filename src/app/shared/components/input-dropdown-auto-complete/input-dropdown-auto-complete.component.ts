import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, ElementRef, forwardRef, Input, OnInit, Optional, Renderer2, Self, SkipSelf, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ControlContainer, ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgControl, NG_VALUE_ACCESSOR, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { DataInputDropdownConfig } from '../../models/data-input-dropdown-config.model';

@Component({
    selector: 'bpgear-input-dropdown-auto-complete',
    templateUrl: './input-dropdown-auto-complete.component.html',
    styleUrls: ['./input-dropdown-auto-complete.component.scss'],
    // viewProviders: [{
    //     provide: ControlContainer,
    //     useFactory: (container: ControlContainer) => container,
    //     deps: [[new SkipSelf(), ControlContainer]],
    // }]
})
export class InputDropdownAutoCompleteComponent implements OnInit, AfterViewInit {
    @Input() name: string = '';
    @Input() classes: string[] = [];
    @Input() itens: any[] = [];
    itensRef: any[] = [];
    @Input() dataInputDropdownConfig: DataInputDropdownConfig;
    @Input() controlName: string;
    @Input() formGroup: FormGroup;

    @ViewChild('inputDropdownAutoComplete') public elementInput: ElementRef;
    @ViewChild('myDrop') public elementDrop: NgbDropdown;

    constructor() {
    }

    ngOnInit(): void {
        this.itensRef = this.itens;
        this.formControl.addAsyncValidators(this.matchValue());

    }

    ngAfterViewInit(): void {
        setTimeout(() => { if (this.formControl.value) this.searchValueInitial(this.formControl.value); });

    }

    setValue(item): any {
        this.formControl.setValue(this.configPropertyValue(item));
        this.formControl.setErrors(null);
        this.elementInput.nativeElement.value = this.configPropertyView(item);
        this.deleteViewValueSelected();
    }

    matchValue(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            let validate = { notMatchValue: true };
            this.itens.forEach((item) => {
                const valueView = item[this.dataInputDropdownConfig.propertySearch.join('.')] as string;
                if (valueView === this.elementInput?.nativeElement.value) {
                    this.setValue(item);
                    validate = null;
                } else if (validate) {
                    validate = { notMatchValue: true };
                }
            });
            return of(validate);
        };
    }

    deleteViewValueSelected(): void {
        this.itensRef = this.itens.filter((value) => this.formControl.value != value[this.dataInputDropdownConfig.propertyValue.join('.')]);
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

    configPropertyValue(item: any): any {
        if (this.dataInputDropdownConfig) {
            return item[this.dataInputDropdownConfig.propertyValue.join('.')];
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

    searchValueInitial(valueInitial: any): void {
        this.itens.forEach((value) => {
            const valueItem = value[this.dataInputDropdownConfig.propertyValue.join('.')] as string;
            if (valueItem.toLocaleLowerCase().search(valueInitial.toLocaleLowerCase()) !== -1) {
                this.setValue(value);
                this.formControl.markAsTouched();
                return;
            }
        });
    }

    get formControl() { return this.formGroup.controls[this.controlName] as FormControl; }

}
