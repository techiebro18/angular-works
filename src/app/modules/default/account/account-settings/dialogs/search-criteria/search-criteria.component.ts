import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.scss'],
})
export class SearchCriteriaComponent implements OnInit {
  searchCriteria: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SearchCriteriaComponent>
  ) {
    this.searchCriteria = data;
  }

  ngOnInit(): void {}

  get hasCriteria(): boolean {
    const criteria = this.searchCriteria;
    const noDates
      = Object.values(this.searchCriteria.dateRange || []).filter(item => item).length === 0;

    if (noDates) {
      delete criteria.dateRange;
    }

    return Object.keys(criteria).length === 0;
  }

  setCriteria(key, value) {
    this.searchCriteria = {
      ...this.searchCriteria,
      [key]: value,
    };
  }

  clearCriteria(): void {
    this.searchCriteria = {};
  }

  onSelectDateRange(dateRange: any): void {
    this.setCriteria('dateRange', dateRange);
  }

  /**
   * Apply search
   */
  applySearch() {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
