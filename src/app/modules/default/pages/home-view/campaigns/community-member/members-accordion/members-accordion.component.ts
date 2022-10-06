import { Component, Input, OnInit } from '@angular/core';
import { MemberBio } from '@schemas/community/member-bio';
import { BehaviorSubject } from 'rxjs';
import { ScreenDetectorService } from 'src/app/core/services/app/screen-detector.service';

@Component({
  selector: 'tvb-members-accordion',
  templateUrl: './members-accordion.component.html',
  styleUrls: ['./members-accordion.component.scss'],
})
export class MembersAccordionComponent implements OnInit {
  @Input() users: Array<MemberBio>;
  isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public id: number;
  public items: Array<MemberBio>;
  constructor(private screenDetectorService: ScreenDetectorService) {}

  ngOnInit(): void {
    this.setupComponent();
  }

  setupComponent() {
    this.items = this.users;
    this.isMobile$ = this.screenDetectorService.isMobile;
    this.sortAccordion();

    if (this.isMobile$.value) {
      this.id = this.items[1]?.id;
    }
    else this.id = this.items[2]?.id;
  }

  sortAccordion() {
    this.items.sort(function (a, b) {
      if (a.sort > b.sort) {
        return 1;
      }

      if (a.sort < b.sort) {
        return -1;
      }

      return 0;
    });
  }

  openTab(id): void {
    this.id = id;
  }
}
