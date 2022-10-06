/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchRequest } from '../../../shared/schemas/search/search-request';
import { FilterRecordNew } from '@schemas/product.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  selectedFilters: BehaviorSubject<FilterRecordNew> = new BehaviorSubject<FilterRecordNew>({
    category: [],
    subcategory: [],
    designer: [],
    style: [],
    color: [],
    shoes_size: [],
    bag_size: [],
    cloth_size: [],
    style_seo_url: null,
    designer_seo_url: null,
    parent_category_seo_url: null,
    child_category_seo_url: null,
    discover_seo_url: null,
  });

  searchRequest: BehaviorSubject<SearchRequest> = new BehaviorSubject<SearchRequest>({
    page: 0,
    pageSize: 9999,
    filters: [],
    sorting: null,
    currency: '',
    language: '',
  });

  getSectionFilters(request: SearchRequest): Observable<unknown> {
    return this.http.post(environment.SEARCH_API_URL + '/products/sections', request);
  }

  updateFilterProperty(fieldName: string, fieldValue: any): void {
    let validatedFieldValue = [];

    if (typeof fieldValue == 'string') {
      validatedFieldValue.push(fieldValue);
    }
    else if (Array.isArray(fieldValue)) {
      validatedFieldValue = fieldValue;
    }

    const currentFilters = this.selectedFilters.value;

    currentFilters[fieldName] = validatedFieldValue;

    this.selectedFilters.next(currentFilters);
  }

  searchProduct(searchFilter: SearchRequest): Observable<any> {
    return this.http.post(environment.SEARCH_API_URL + '/products/filter', searchFilter);
  }
}
