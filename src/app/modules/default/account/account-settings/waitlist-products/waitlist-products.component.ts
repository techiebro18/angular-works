import { Component, OnInit } from '@angular/core';
import { WaitlistService } from '@services/waitlist.service';
import { AppService } from '@services/app/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';
import * as algoliasearch from 'algoliasearch/lite';

@Component({
  selector: 'app-waitlist-products',
  templateUrl: './waitlist-products.component.html',
  styleUrls: ['./waitlist-products.component.scss'],
})
export class WaitlistProductsComponent implements OnInit {
  currentAppConfiguaration: any;

  public instantsearchConfig = {
    //TODO: change index based on sortBy param for default sortBy
    indexName: environment.INSTANT_SEARCH_INDEX_NAME_PERSONAL,
    searchClient: algoliasearch(
      environment.INSTANT_SEARCH_APP_ID,
      environment.INSTANT_SEARCH_SEARCH_API_KEY
    ),
  };
  public sortByItems = [
    { value: environment.INSTANT_SEARCH_INDEX_NAME, label: 'Sort by Recommended' },
    { value: environment.INSTANT_SEARCH_INDEX_NAME_PERSONAL, label: 'Sort by New In' },
    {
      value: environment.INSTANT_SEARCH_INDEX_NAME_PRICE_DESC,
      label: 'Sort by Price: Hight to Low',
    },
    { value: environment.INSTANT_SEARCH_INDEX_NAME_PRICE_ASC, label: 'Sort by Price: Low to High' },
    { value: environment.INSTANT_SEARCH_INDEX_NAME_MOST_WANTED, label: 'Sort by Most Wanted' },
  ];
  searchParameters = { hitsPerPage: 60, distinct: true, enablePersonalization: true, filters: '' };
  filterParams: any;
  enableList: boolean;
  constructor(
    public waitlistService: WaitlistService,
    public appService: AppService,
    public SpinnerService: NgxSpinnerService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.currentAppConfiguaration = this.appService.getAppConfigurationValue();
    this.waitlistService.getWaitlistProducts(id).subscribe(
      data => {
        this.filterParams = data.list
          .map(function (val) {
            return 'objectID: ' + val.id;
          })
          .join(' OR ');
        //console.log(this.filterParams);
        this.searchParameters.filters = this.filterParams;
        this.enableList = true;
      },
      error => {
        console.log(error);
      }
    );
  }
}
