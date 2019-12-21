import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { Injectable } from '@angular/core';

@Injectable()
export class RouteDataService {
    constructor(private router: Router) {
    }
    
    getCurrentRouteData() {
        const lastRoute = this.findLastRoute(this.router.routerState.snapshot.root);
        return lastRoute.data;
    }

    private findLastRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
        if (route.children && route.children[0]) {
            return this.findLastRoute(route.children[0]);
        }
        else {
            return route;
        }
    }
}