import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TitleService {
    title$ = new BehaviorSubject<string>("");
    constructor(
        private router: Router,
        private titleService: Title
    ) {
        this.getTitle();
    }

    getTitle(): void {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => {
                    let route: ActivatedRoute = this.router.routerState.root;
                    let routeTitle = '';
                    while (route!.firstChild) {
                        route = route.firstChild;
                    }
                    if (route.snapshot.data['title']) {
                        routeTitle = route!.snapshot.data['title'];
                    }
                    return routeTitle;
                })
            )
            .subscribe((title: string) => {
                if (title) {
                    this.title$.next(`${title}`);
                }
            });
    }
}
