import { EventEmitter, Output, SimpleChange } from '@angular/core';
import { Component, ElementRef, Inject, Input, ViewChild, forwardRef } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectAutocomplete, connectSearchBox } from 'instantsearch.js/es/connectors';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';
import { SlideInOutAnimation } from './slide-in-out-animation';

@Component({
  selector: 'app-search-box',
  templateUrl: './app-search-box.component.html',
  styleUrls: ['./app-search-box.component.scss'],
  animations: [SlideInOutAnimation],
})
export class SearchBoxComponent extends BaseWidget {
  @Input() startsOpen = false;
  @Input() public items: { value: string; label: string }[];
  @Output() public onToggleSearch = new EventEmitter<boolean>();

  public animationState = 'out'; // component is closed by default
  public search = '';
  private timeout?: number;

  public state: {
    query: string;
    refine: Function;
    clear: Function;
    isSearchStalled: boolean;
    widgetParams: object;
    indices: [];
  };
  _currentUrl = '';

  @Output() onQuerySuggestionClick = new EventEmitter<{ query: string }>();
  @ViewChild('searchbox', { static: false }) inputSearch: ElementRef;

  constructor(
    private _router: Router,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('AutocompleteComponent');
  }

  ngOnInit(): void {
    if (this.startsOpen) {
      this.animationState = 'in';
    }

    this.createWidget(connectAutocomplete, {
      indices: [{ value: environment.INSTANT_SEARCH_INDEX_NAME_QUERY_SUGGESTIONS }],
    });
    super.ngOnInit();
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    const startsOpen: SimpleChange = changes['startsOpen'];

    startsOpen && this.toggleShowInOut(startsOpen.currentValue);
  }

  public toggleShowInOut(isOpen: boolean | null = null): void {
    if (isOpen === true) {
      this.animationState = 'in';
      setTimeout(() => this.inputSearch.nativeElement.focus(), 100);
    }
    else if (isOpen === false) {
      this.animationState = 'out';
    }
    else {
      this.animationState = this.animationState === 'out'
        ? 'in'
        : 'out';
    }
  }

  public hideSearchBox(): void {
    this.toggleShowInOut(false);
  }

  public handleChange($event: KeyboardEvent): void {
    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => this.searchItem($event), 500);
  }

  searchItem($event: KeyboardEvent): void {
    this.search = ($event.target as HTMLInputElement).value;

    if ($event && $event.key === 'Enter') {
      if (this.search.trim() !== '') {
        this._router.navigate(['/searchItems/' + this.search]);
        this.toggleShowInOut(false);
        this.onToggleSearch.emit(true);
      }
    }
    else {
      this.state.refine(($event.target as HTMLInputElement).value);
    }
  }

  clearSearch(): void {
    this.inputSearch.nativeElement.value = '';
    this.search = this.inputSearch.nativeElement.value;
    this.state.refine(this.inputSearch.nativeElement.value);
  }

  onEnter(search: string): void {
    if (search.trim() !== '') {
      this._router.navigate(['/searchItems/' + search]);
      this.toggleShowInOut(false);
      this.onToggleSearch.emit(true);
      this.inputSearch.nativeElement.value = '';
    }
  }

  queryNavigate(search: string): void {
    this._router.navigate(['/searchItems/' + search]);
    this.toggleShowInOut(false);
    this.onToggleSearch.emit(true);
  }

  brandNavigate(seoUrl: any): void {
    if (seoUrl == null) {
      // return false;
    }
    else {
      const url = seoUrl;

      this._router.navigate(['/designer/' + url]);
      this.toggleShowInOut(false);
      this.onToggleSearch.emit(true);
    }
  }
}
