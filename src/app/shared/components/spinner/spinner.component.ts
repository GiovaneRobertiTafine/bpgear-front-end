import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
    selector: 'bpgear-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, AfterContentChecked {

    constructor(
        public spinnerService: SpinnerService,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }
}
