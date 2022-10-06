import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConfiguration } from '@schemas/app.interface';
import { AppService } from '@services/app/app.service';
import { Router } from '@angular/router';
import { ScreenDetectorService } from 'src/app/core/services/app/screen-detector.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'tvb-for-your-budget',
  templateUrl: './for-your-budget.component.html',
  styleUrls: ['./for-your-budget.component.scss'],
})
export class ForYourBudgetComponent implements OnInit {
  env = environment;
  public appConfig: AppConfiguration;
  public isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public budget = {
    EUR: [
      { param: '-50', label: 'Under 50€' },
      { param: '50-300', label: '50 - 300€' },
      { param: '300-500', label: '300 - 500€' },
      { param: '500-1000', label: '500 - 1000€' },
      { param: '1000-', label: 'Exclusives' },
    ],
    DKK: [
      { param: '-400', label: 'Under 400 DKK' },
      { param: '400-2000', label: '400 - 2000 DKK' },
      { param: '2000-4000', label: '2000 - 4000 DKK' },
      { param: '4000-7500', label: '4000 - 7500 DKK' },
      { param: '7500-', label: 'Exclusives' },
    ],
    USD: [
      { param: '-100', label: 'Under 100$' },
      { param: '100-400', label: '100 - 400$' },
      { param: '400-600', label: '400 - 600$' },
      { param: '600-1200', label: '600 - 1200$' },
      { param: '1200-', label: 'Exclusives' },
    ],
    SEK: [
      { param: '-600', label: 'Under 600 SEK' },
      { param: '600-2500', label: '600 - 2500 SEK' },
      { param: '2500-5500', label: '2500 - 5500 SEK' },
      { param: '5500-9500', label: '5500 - 9500 SEK' },
      { param: '9500-', label: 'Exclusives' },
    ],
    GBP: [
      { param: '-50', label: 'Under 50£' },
      { param: '50-300', label: '50 - 300£' },
      { param: '300-500', label: '300 - 500£' },
      { param: '500-1000', label: '500 - 1000£' },
      { param: '1000-', label: 'Exclusives' },
    ],
  };

  constructor(
    private router: Router,
    public appService: AppService,
    private screenDetectorService: ScreenDetectorService
  ) {}

  ngOnInit(): void {
    this.isMobile$ = this.screenDetectorService.isMobile;
    this.appService.getAppConfigurationBehavior().subscribe(data => {
      this.appConfig = data;
    });
  }
}
