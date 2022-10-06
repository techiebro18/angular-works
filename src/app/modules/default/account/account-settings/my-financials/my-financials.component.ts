import { Component, OnInit } from '@angular/core';
import { ScreenDetectorService } from 'src/app/core/services/app/screen-detector.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { MetaService } from '@services/app/meta.service';

@Component({
  selector: 'app-my-financials',
  templateUrl: './my-financials.component.html',
  styleUrls: ['./my-financials.component.scss'],
})
export class MyFinancialsComponent implements OnInit {
  isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchCritera: any = {};
  public payoutTab = false;
  public transactionTab = true;
  public previousURL = 'my-financials';

  constructor(
    private screenDetectorService: ScreenDetectorService,
    private router: Router,
    private metaService: MetaService
  ) {
    this.router.events
      .pipe(
        filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((e: any) => {
        const tree = router.parseUrl(e[0].urlAfterRedirects);

        this.previousURL = tree.root.children['primary'].segments[1].path
          ? tree.root.children['primary'].segments[1].path
          : this.previousURL;
        localStorage.setItem('previousURL', this.previousURL);
      });
  }

  ngOnInit(): void {
    this.metaService.getStaticPageMeta('account/my-financials', '', 'My Financials');
    this.isMobile$ = this.screenDetectorService.isMobile;
    this.payoutTab = localStorage.getItem('previousURL') == 'payout-detail'
      ? true
      : false;
    this.transactionTab = localStorage.getItem('previousURL') == 'my-financials'
      ? true
      : false;
    this.transactionTab
      = localStorage.getItem('previousURL') != ('my-financials' && 'payout-detail')
        ? true
        : false;
  }
}
