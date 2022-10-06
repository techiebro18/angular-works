import { Component, OnInit } from '@angular/core';
import { SearchService } from '@services/search/search.service';
import { AppService } from '@services/app/app.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { SearchRequest } from '@schemas/search/search-request';
import { AppConfiguration } from '@schemas/app.interface';

@Component({
  selector: 'tvb-listing-view-elk',
  templateUrl: './listing-view-elk.component.html',
  styleUrls: ['./listing-view-elk.component.scss'],
})
export class ListingViewElkComponent implements OnInit {
  public searchFilter: SearchRequest;
  public appConfig: AppConfiguration;
  private routeDataParams: Data;
  private routePathParams: Params;
  private routeQueryParams: Params;
  private language: string;
  private currency: string;

  constructor(
    private searchService: SearchService,
    public appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.searchFilter = {
      page: 0,
      pageSize: 9999,
      filters: [],
      sorting: null,
      currency: '',
      language: '',
    };
  }

  async ngOnInit(): Promise<void> {
    this.appService.getAppConfigurationBehavior().subscribe((val: AppConfiguration) => {
      this.appConfig = val;
      this.language = this.appConfig.languageShortName;
      this.currency = this.appConfig.currencyCode.toUpperCase();
    });
    this.routeDataParams = this.activatedRoute.snapshot.data;
    this.routePathParams = this.activatedRoute.snapshot.params;
    this.routeQueryParams = this.activatedRoute.snapshot.queryParams;
    this.searchFilter.currency = this.currency;
    this.searchFilter.language = this.routeDataParams['language'] || this.language;
    this.searchService.searchRequest.next(this.searchFilter);
    this.setupFilterAccordingToUrlPathParams({
      pathParamName: 'search_query',
      filterFieldName: 'searchItems',
      plpFor: 'searchItems',
    });
    this.setupFilterAccordingToUrlPathParams({
      pathParamName: 'designer_seo_url',
      filterFieldName: 'brand',
      plpFor: 'designer',
    });
    this.setupFilterAccordingToUrlPathParams({ pathParamName: 'parent_category_seo_url', filterFieldName: 'category' });
    this.setupFilterAccordingToUrlPathParams({ pathParamName: 'child_category_seo_url', filterFieldName: 'sub' });
    this.setupFilterAccordingToUrlQueryParams();
    this.doSearch();
  }

  private setupFilterAccordingToUrlQueryParams(): void {
    // Checking if the URL query path has several params
    if (Object.keys(this.routeQueryParams).length > 0) {
      this.handlePathParamRepeatedInQueryParams('parent_category_seo_url', 'category');
      this.handlePathParamRepeatedInQueryParams('child_category_seo_url', 'sub');
      this.setupQueryParamForDependentPathParam({
        pathParamName: 'search_query',
        dependentQueryParam: 'category',
        couldPathParamBeRepeatedInQueryParams: false,
      });
      this.setupQueryParamForDependentPathParam({
        pathParamName: 'search_query',
        dependentQueryParam: 'sub',
        couldPathParamBeRepeatedInQueryParams: false,
      });
      this.setupQueryParamForDependentPathParam({
        pathParamName: 'designer',
        dependentQueryParam: 'category',
        couldPathParamBeRepeatedInQueryParams: true,
      });
      this.setupQueryParamForDependentPathParam({
        pathParamName: 'designer',
        dependentQueryParam: 'sub',
        couldPathParamBeRepeatedInQueryParams: true,
      });

      // Setting up fields that comes only in the URL query params
      this.setupSearchFilterForField('color');
      this.setupSearchFilterForField('price');
      this.setupSearchFilterForField('brand');
      this.setupSearchFilterForField('style');
      this.setupSearchFilterForField('condition');
      this.setupSearchFilterForField('discount');
    }
  }

  private handlePathParamRepeatedInQueryParams(pathParamName: string, queryParamName: string): void {
    if (pathParamName in this.routePathParams && Array.isArray(this.routeQueryParams[queryParamName])) {
      this.searchFilter.filters = this.searchFilter.filters.filter(_ => !(_.field === queryParamName));
      this.searchService.searchRequest.next(this.searchFilter);
      this.setupSearchFilterForField(queryParamName);
    }
  }

  private setupQueryParamForDependentPathParam(options: {
    pathParamName: string;
    dependentQueryParam: string;
    couldPathParamBeRepeatedInQueryParams: boolean;
  }): void {
    if (options.pathParamName in this.routePathParams) {
      this.setupSearchFilterForField(options.dependentQueryParam);
    }

    if (options.couldPathParamBeRepeatedInQueryParams) {
      this.handlePathParamRepeatedInQueryParams(options.pathParamName, options.dependentQueryParam);
    }
  }

  /**
   * @param options.pathParamName: the name of parameter found in the URL path (activatedRoute.snapshot.params)
   * @param options.filterFieldName: the name of field as the SearchAPI expects
   * @param options.plpFor: the value of the 'plpFor' property that comes in the activatedRoute.snapshot.data section
   * @param options.operator: the type of the operator for the search
   */
  private setupFilterAccordingToUrlPathParams(options: {
    pathParamName: string;
    filterFieldName: string;
    operator?: string;
    plpFor?: string;
  }): void {
    options.operator ??= '==';
    options.plpFor ??= '';

    if (options.pathParamName in this.routePathParams) {
      this.searchFilter.filters.push({
        field: options.filterFieldName,
        value: this.routePathParams[options.pathParamName],
        operator: options.operator,
      });

      this.searchService.searchRequest.next(this.searchFilter);
      this.searchService.updateFilterProperty(options.filterFieldName, [
        ...(this.searchService.selectedFilters.value[options.filterFieldName] || []),
        this.routePathParams[options.pathParamName],
      ]);
    }
  }

  /**
   * Given a fieldName and operator, it will fetch the respective value(s) and will aggregate the Search Filter.
   *
   * @param fieldName
   * @param operator
   *
   */
  private setupSearchFilterForField(fieldName: string, operator = '=='): void {
    let fieldValues: string[] = [];

    // In case of only one param value
    if (typeof this.routeQueryParams[fieldName] == 'string') {
      fieldValues.push(this.routeQueryParams[fieldName]);
    }

    // In case of more than one param value
    if (Array.isArray(this.routeQueryParams[fieldName])) {
      fieldValues = [...this.routeQueryParams[fieldName]];
    }

    fieldValues.forEach((fieldValue: string) => {
      this.searchFilter.filters.push({
        field: fieldName,
        value: fieldValue,
        operator: operator,
      });
      this.searchService.searchRequest.next(this.searchFilter);
      this.searchService.updateFilterProperty(fieldName, [
        ...(this.searchService.selectedFilters.value[fieldName] || []),
        fieldValue,
      ]);
    });
  }

  doSearch(): void {
    this.searchService.searchProduct(this.searchFilter).subscribe({
      next: (value: any) => {
        console.log('>> ListingViewElk.SearchService.searchProduct response: ', value);
      },
      error: (err: any) => {
        console.log('>> ListingViewElk.SearchService.searchProduct error: ', err);
      },
    });
  }
}
