import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemLinkNavBar } from '../../models/constants/item-link-nav-bar.constant';

@Component({
    selector: 'bpgear-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    links = ItemLinkNavBar;
    constructor() { }

    ngOnInit(): void {
    }

}
