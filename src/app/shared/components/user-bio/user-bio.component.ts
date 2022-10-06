import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { UserRolesEnum } from '@shared/enums/user-roles.enum';
import { MemberBio } from '../../schemas/community/member-bio';

@Component({
  selector: 'app-user-bio',
  templateUrl: './user-bio.component.html',
  styleUrls: ['./user-bio.component.scss'],
})
export class UserBioComponent implements OnInit {
  @Input() public member: MemberBio;
  public displayedName: string;
  public PROFESSIONAL_SELLER = 15;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadBioInfo();
    this.renderer.addClass(document.body, 'noHorizontalScroll');
  }

  loadBioInfo() {
    if (this.member) {
      switch (this.member.role_id) {
      case UserRolesEnum.PROFESSIONAL_SELLER:
        this.displayedName
            = this.member.user_id === 0
            ? this.member.first_name
            : this.member.username ?? this.member.first_name;
        break;
      case UserRolesEnum.USER:
      case UserRolesEnum.INFLUENCER:
      default:
        this.displayedName = this.member.first_name ?? this.member.username;
        break;
      case UserRolesEnum.TVB_ADMIN:
        this.displayedName = this.member.company_name ?? this.member.username;
        break;
      }
    }
  }
}
