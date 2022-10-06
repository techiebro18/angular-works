import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { UniversalService } from '@services/universal.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private translate: TranslateService, private universalService: UniversalService) {}
  currentDate = new Date().getFullYear();
  baseUrl = environment.baseUrl;
  ngOnInit(): void {}

  redirectToExternalUrl(redirectUrl: string, ev) {
    ev.preventDefault();
    this.translate.get(redirectUrl).subscribe((langText: string) => {
      if (this.universalService.isBrowser) {
        window.location.href = this.baseUrl + langText;
      }
    });

    return false;
  }
}
