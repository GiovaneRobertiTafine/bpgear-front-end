import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ItemLinkSideBar } from '../../models/constants/item-link-side-bar.constant';
@Component({
    selector: 'bpgear-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
    iconArrowLeft = faArrowLeft;
    minimize = false;
    links = ItemLinkSideBar;
    id = '';
    constructor(private route: Router) {
        const arrayPath = this.route.url.split('/');
        this.id = arrayPath[arrayPath.length - 1];
    }

    ngOnInit(): void {
    }

}
