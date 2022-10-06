import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
  DetachedRouteHandle,
} from '@angular/router';

export class AppRouteReuseStrategy extends BaseRouteReuseStrategy {
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    //Don't reuse any componentthat has reuseComponent set to false
    if (future.data?.reuseComponent === false) {
      return false;
    }

    return future.routeConfig === curr.routeConfig || future.data.reuseComponent;
  }
}
