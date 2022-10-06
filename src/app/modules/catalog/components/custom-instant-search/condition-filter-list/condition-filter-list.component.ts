import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MobileService } from '@services/mobile.service';
import { AppService } from '@services/app/app.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@services/app/dialog.service';
import { ConditionDialogComponent } from 'src/app/modules/catalog/components/dialogs/condition-dialog/condition-dialog.component';

@Component({
  selector: 'tvb-condition-filter-list',
  templateUrl: './condition-filter-list.component.html',
  styleUrls: ['./condition-filter-list.component.scss', '../custom-instant-search.scss'],
})
export class ConditionFilterListComponent implements OnInit {
  @Input() public filter: any;
  @Input() public isCollapsed = false;

  @Output() toggleChanged: EventEmitter<string> = new EventEmitter();

  conditionFilter: any;
  platform$: Observable<string>;
  isHidden = false;
  items: any;
  dialogRef: MatDialogRef<any> | undefined;

  constructor(
    private mobileService: MobileService,
    private route: ActivatedRoute,
    public appService: AppService,
    private dialogModalService: DialogService
  ) {
    this.platform$ = this.mobileService.isMobile$.pipe(map(isMobile => (isMobile ? 'Mobile' : 'Desktop')));
  }

  ngOnInit(): void {
    this.conditionFilter = this.route.snapshot.queryParamMap.get('condition');
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;

    if (this.isCollapsed) {
      this.toggleChanged.emit('price');
    }
  }

  openDialog(): void {
    window.scroll({ top: 0, left: 0 });
    this.dialogRef = this.dialogModalService.openAuthenticityPopup<ConditionDialogComponent>(ConditionDialogComponent);
  }
}
