import { Component, Input, OnInit } from '@angular/core';
import { Category } from '@schemas/category.interface';
import { AppService } from '@services/app/app.service';
import { TheArchiveService } from '@services/the-archive.service';
import { UniversalService } from '@services/universal.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() image = true;
  public menuClass = '';
  public baseRemoteUrl = '';
  public categories: any = null;
  public flashBannerEnabled = false;

  constructor(
    private universalService: UniversalService,
    private theArchiveService: TheArchiveService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
    this.flashBannerEnabled = this.appService.getFlashBannerStatus().getValue();
    this.getCategories();
  }

  getCategories() {
    this.theArchiveService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  toogleMenu() {
    this.menuClass = this.menuClass == '' ? 'category-menu-black-open' : '';
  }
}
