import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'bpgear-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
    public id = '';
    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
    }

}
