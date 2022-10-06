import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { FilterRecordNew } from '@schemas/product.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private http: HttpClient) {}

  private selectedFilterListBehaviour = new Subject<FilterRecordNew | null>();
  selectedFilterListObservable = this.selectedFilterListBehaviour.asObservable();

  private applyCreateAlertBehaviour = new BehaviorSubject<boolean>(null);
  applyCreateAlertObservable = this.applyCreateAlertBehaviour.asObservable();

  private _sortBy$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public sortBy: Observable<string> = this._sortBy$.asObservable();

  selectedFilterList(filterList: any) {
    this.selectedFilterListBehaviour.next(filterList);
  }
  saveCreateAlert(formData: any): Observable<any> {
    return this.http.post(`${environment.API_V2_URL}createAlert`, formData);
  }

  applyCreateAlert(status: boolean) {
    this.applyCreateAlertBehaviour.next(status);
  }

  setSortBy(condition: string) {
    this._sortBy$.next(condition);
  }

  getSortBy(): string {
    return this._sortBy$.getValue();
  }
}
