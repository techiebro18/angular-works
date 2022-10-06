import { Component, OnInit } from '@angular/core';
import { Filters, SearchRequest } from '@schemas/search/search-request';
import { firstValueFrom } from 'rxjs';
import { AppConfiguration } from '@schemas/app.interface';
import { AppService } from '@services/app/app.service';
import { SearchService } from '../../../../../core/services/search/search.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

@Component({
  selector: 'tvb-filters-section',
  templateUrl: './filters-section.component.html',
  styleUrls: ['./filters-section.component.scss'],
})
export class FiltersSectionComponent implements OnInit {
  public sections: any;
  public searchRequest: SearchRequest;
  public appConfig: AppConfiguration;
  private routeDataParams: Data;
  private routePathParams: Params;
  private routeQueryParams: Params;
  private originalPath: string;
  private functionMappingForOptionToggling = {
    category: this.onToggleCategoryOption.bind(this),
    sub: this.onToggleSubCategoryOption.bind(this),
  };

  constructor(
    private searchService: SearchService,
    public appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public async ngOnInit(): Promise<void> {
    this.routeDataParams = this.activatedRoute.snapshot.data;
    this.routePathParams = this.activatedRoute.snapshot.params;
    this.routeQueryParams = this.activatedRoute.snapshot.queryParams;
    this.appService.getAppConfigurationBehavior().subscribe((val: AppConfiguration) => (this.appConfig = val));
    await this.getSectionsFilters();
    this.searchService.searchRequest.subscribe(val => (this.searchRequest = val));

    if ('parent_category_seo_url' in this.routePathParams) {
      this.originalPath = this.routePathParams['parent_category_seo_url'];
    }
  }

  public async getSectionsFilters(): Promise<void> {
    function mountSectionFiltersParams() {
      return this.searchService.searchRequest.value.filters.map((f: Filters) => ({
        field: f.field,
        value: f.value,
        operator: '==',
      }));
    }

    this.sections = await firstValueFrom(
      this.searchService.getSectionFilters({
        page: 0,
        pageSize: 9999,
        filters: mountSectionFiltersParams.call(this),
        sorting: null,
        currency: this.appConfig.currencyCode,
        language: this.appConfig.languageShortName,
      })
    );
  }

  public handleOptionToggling(filterName: string, filterValue: string): void {
    this.functionMappingForOptionToggling[filterName](filterName, filterValue);
  }

  public onToggleCategoryOption(filterName: string, filterValue: string): void {
    const lang = this.appConfig.languageShortName;
    const selectedSectionUrl: string = this.sections.categories.find(
      section => section[filterName + '_url_' + lang] === filterValue
    )[filterName + '_url_' + lang];
    const searchRequestSnapshot = this.searchService.searchRequest.value;
    const searchFiltersSnapshot = searchRequestSnapshot.filters;
    const shouldRemoveOption = !!searchFiltersSnapshot.find(_ => _.value === selectedSectionUrl);
    let urlPath = window.location.pathname;
    let urlSearchPath = window.location.search || '';

    if (shouldRemoveOption) {
      const queryFirstOperator = searchFiltersSnapshot.length == 1 ? '?' : '&';

      if (filterName in this.routeQueryParams && this.routeQueryParams[filterName] === filterValue) {
        urlSearchPath = urlSearchPath.replace('&' + filterName + '=' + filterValue, '');
      }

      if (
        'parent_category_seo_url' in this.routePathParams &&
        this.routePathParams['parent_category_seo_url'].includes(searchFiltersSnapshot[0].value) &&
        filterName === 'category'
      ) {
        if (searchFiltersSnapshot.length == 1) {
          urlSearchPath = urlSearchPath.replace(queryFirstOperator + filterName + '=' + filterValue, '');
          urlPath = urlPath.replace('/' + filterValue, '');
        }

        if (searchFiltersSnapshot.length == 2) {
          if (this.routePathParams['parent_category_seo_url'] === filterValue) {
            urlPath = urlPath.replace(searchFiltersSnapshot[0].value, searchFiltersSnapshot[1].value);
            urlSearchPath = urlSearchPath.replace('?' + filterName + '=' + filterValue, '');
          }
          else {
            urlSearchPath = urlSearchPath.replace(queryFirstOperator + filterName + '=' + filterValue, '');
          }

          urlSearchPath = '?' + urlSearchPath.substring(1);
        }

        if (searchFiltersSnapshot.length >= 3) {
          if (this.routePathParams['parent_category_seo_url'] === searchFiltersSnapshot[0].value) {
            urlSearchPath = urlSearchPath.replace('?' + filterName + '=' + filterValue, '');
            urlSearchPath = '?' + urlSearchPath.substring(1);
          }

          if (this.routePathParams['parent_category_seo_url'] !== searchFiltersSnapshot[1].value) {
            urlPath = urlPath.replace(searchFiltersSnapshot[0].value, searchFiltersSnapshot[1].value);
          }
        }
      }
      else {
        urlSearchPath = urlSearchPath.replace(`${queryFirstOperator}${filterName}=${filterValue}`, '');
      }

      const newFilters = searchFiltersSnapshot.filter(_ => !(_.value == filterValue));

      searchRequestSnapshot.filters = newFilters;
      this.searchService.searchRequest.next(searchRequestSnapshot);
    }
    else {
      if (searchFiltersSnapshot.length == 0) {
        if (
          !this.routePathParams['parent_category_seo_url'] &&
          this.routePathParams[filterName] !== filterValue &&
          filterName === 'category'
        ) {
          urlSearchPath += '/' + filterValue;
        }

        urlSearchPath += '?' + filterName + '=' + filterValue;
      }
      else if (searchFiltersSnapshot.length == 1) {
        if ('parent_category_seo_url' in this.routePathParams && searchFiltersSnapshot[0].field === 'category') {
          if (!window.location.search.includes('?category=' + this.routePathParams['parent_category_seo_url'])) {
            urlSearchPath += '?category=' + this.routePathParams['parent_category_seo_url'];
          }

          urlSearchPath += '&' + filterName + '=' + filterValue;
        }
      }
      else {
        urlSearchPath += '&' + filterName + '=' + filterValue;
      }

      searchRequestSnapshot.filters.push({
        field: filterName,
        value: filterValue,
        operator: '==',
      });
      this.searchService.searchRequest.next(searchRequestSnapshot);
    }

    this.router.navigateByUrl(urlPath + urlSearchPath);
  }

  public onToggleSubCategoryOption(filterName: string, filterValue: string): void {
    const lang = this.appConfig.languageShortName;
    const selectedSectionUrl: string = this.sections['subCategories'].find(
      section => section[filterName + '_url_' + lang] === filterValue
    )[filterName + '_url_' + lang];
    const searchRequestSnapshot = this.searchService.searchRequest.value;
    const searchFiltersSnapshot = searchRequestSnapshot.filters;
    const subCategoriesInSearchFilters = searchFiltersSnapshot.filter(_ => _.field === filterName);
    const shouldRemoveOption = !!searchFiltersSnapshot.find(_ => _.value === selectedSectionUrl);
    let urlPath = window.location.pathname;
    let urlSearchPath = window.location.search || '';

    if (shouldRemoveOption) {
      if (
        (filterName in this.routeQueryParams || filterName in this.routeQueryParams) &&
        this.routeQueryParams[filterName]?.includes(filterValue)
      ) {
        urlSearchPath = urlSearchPath.replace('&' + filterName + '=' + filterValue, '');
      }

      if (
        'child_category_seo_url' in this.routePathParams &&
        this.routePathParams['child_category_seo_url'].includes(filterValue)
      ) {
        if (typeof this.routeQueryParams[filterName] === 'string') {
          urlPath = urlPath.replace('/' + filterValue, '');
        }

        if (Array.isArray(this.routeQueryParams[filterName])) {
          urlPath = urlPath.replace(
            '/' + filterValue,
            '/' + this.routeQueryParams[filterName].find(_ => _ !== filterValue)
          );
        }
      }

      const newFilters = searchFiltersSnapshot.filter(_ => !(_.value == filterValue));

      searchRequestSnapshot.filters = newFilters;
      this.searchService.searchRequest.next(searchRequestSnapshot);
    }
    else {
      if (subCategoriesInSearchFilters.length === 0) {
        if (!this.routePathParams['child_category_seo_url']) {
          urlPath += '/' + filterValue;

          if (!this.routeQueryParams['category']) {
            urlSearchPath += '?category=' + this.routePathParams['parent_category_seo_url'];
          }
        }
      }

      urlSearchPath += '&' + filterName + '=' + filterValue;

      searchRequestSnapshot.filters.push({
        field: filterName,
        value: filterValue,
        operator: '==',
      });
      this.searchService.searchRequest.next(searchRequestSnapshot);
    }

    this.router.navigateByUrl(urlPath + urlSearchPath);
  }

  public isAnyCategorySelected(): boolean {
    return !!this.searchService.searchRequest.value.filters.find(_ => _.field === 'category');
  }
}
