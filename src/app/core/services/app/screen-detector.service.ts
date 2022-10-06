import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScreenDetectorService {
  private isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private mobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small]) {
          if (!this.mobile) {
            this.mobile = true;
            this.isMobile$.next(this.mobile);
          }
        }

        if (
          state.breakpoints[Breakpoints.Medium]
          || state.breakpoints[Breakpoints.Large]
          || state.breakpoints[Breakpoints.XLarge]
        ) {
          if (this.mobile) {
            this.mobile = false;
            this.isMobile$.next(false);
          }
        }
      });
  }

  get isMobile(): BehaviorSubject<boolean> {
    return this.isMobile$;
  }
}
