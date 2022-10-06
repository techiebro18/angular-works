import { AfterContentInit, Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { AppService } from '@services/app/app.service';
import { AZDesignersService } from '@services/azdesigners.service';
import { DOCUMENT } from '@angular/common';
import { SegmentService } from '@services/segment.service';
import { MetaService } from '@services/app/meta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-azdesigners',
  templateUrl: './azdesigners.component.html',
  styleUrls: ['./azdesigners.component.scss'],
})
export class AZDesignersComponent implements OnInit, AfterContentInit {
  public data: any = null;
  designerData: any = [];
  parent_arry = [];
  currentAppConfiguaration: any;
  baseUrl = environment.baseAngularUrl;
  public selectedDesignerId: any;
  public isStickydesigners = false;
  public isSetMargin: any;
  public clickCount: any;
  public designerList: any = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  section = 'designers';

  constructor(
    private metaService: MetaService,
    public appService: AppService,
    public AZDesignersService: AZDesignersService,
    private segmentService: SegmentService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterContentInit(): void {
    this.segmentService.pageView();
  }

  ngOnInit(): void {
    this.metaService.getStaticPageMeta('azdesigners', 'azdesigners_meta_desc', 'Designers | The Vintage Bar');
    this.currentAppConfiguaration = this.appService.getAppConfigurationValue();
    this.AZDesignersService.getAZDesigners(this.currentAppConfiguaration.languageID).subscribe(
      data => {
        this.designerData = data.designerDetail;
        this.parent_arry = data.parent_arry;
      },
      error => {
        console.log(error);
      }
    );
  }

  switchSection(section: string): void {
    this.section = section;
    this.router.navigate(['/azstyles']);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 100) {
      this.isSetMargin = true;
      this.isStickydesigners = true;
    }
    else {
      this.isSetMargin = false;
      this.isStickydesigners = false;
    }
  }
}
