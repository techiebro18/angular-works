import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberBio } from '@schemas/community/member-bio';
import { SoldItem } from '@schemas/community/sold-item';
import { LoaderService } from '@services/app/loader.service';
import { MetaService } from '@services/app/meta.service';
import { MemberBioService } from '@services/community/member-bio.service';
import { ProductService } from '@services/product.service';
import { UserService } from '@services/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  public username: string;
  public userNotFound = false;
  public member: MemberBio;
  public pressItemsSold = false;
  itemsSold: Array<SoldItem>;
  totalItemsSold = 0;
  TVB_USERNAME = 'the-vintage-bar';
  PROFESSIONAL_SELLER = 15;

  constructor(
    private route: ActivatedRoute,
    private memberBioService: MemberBioService,
    private loaderService: LoaderService,
    private productService: ProductService,
    private userService: UserService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.loadBioInfo();
  }

  loadBioInfo() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.metaService.getStaticPageMeta(
      'community/members/' + this.username,
      'community_meta_desc',
      this.username.charAt(0).toUpperCase() + this.username.slice(1) + '\'s Shop'
    );

    if (this.username === this.TVB_USERNAME) {
      this.member = {
        user_id: 0,
        username: 'the-vintage-bar',
        first_name: 'The Vintage Bar',
        country: 'Denmark',
        image_id: 'https://thevintagebar.s3.us-east-2.amazonaws.com/brand/tvb_logo.jpg',
        cover_image: 'https://thevintagebar.s3.us-east-2.amazonaws.com/brand/cover_tvb.jpg',
        member_description:
          'Explore a curated collection of pre-loved premium and luxury classics from the best designers in fashion.',
        role_id: this.PROFESSIONAL_SELLER,
      };
      this.loadSoldItems(this.member.user_id);
      this.getSellerProductCount(this.member.user_id);
    }
    else {
      this.loaderService.triggerLoading.emit(true);
      this.memberBioService
        .getBioInfo(this.username)
        .pipe(
          finalize(() => {
            this.loaderService.triggerLoading.emit(false);
          })
        )
        .subscribe((data: MemberBio) => {
          if (data) {
            this.member = data;

            if (!this.member?.image_id || this.member?.image_id === '')
              this.member.image_id = 'assets/images/avatar.svg';

            this.loadSoldItems(this.member.user_id);
            this.getSellerProductCount(this.member.user_id);
            this.getSellerInfo(this.member.user_id);
          }
          else this.userNotFound = true;
        });
    }
  }

  getSellerInfo(userId: number) {
    this.userService.getSeller(userId).subscribe(data => {
      if (data) {
        this.member.country = data['user'].country;
        this.member.role_id = data['user'].role_id;
        this.member.member_description = data['user'].member_description;
      }
    });
  }

  loadSoldItems(userId: number) {
    this.loaderService.triggerLoading.emit(true);
    this.productService
      .getSellerSoldItems(userId)
      .pipe(
        finalize(() => {
          this.loaderService.triggerLoading.emit(false);
        })
      )
      .subscribe(data => {
        this.member.totalItemsSold = data ?? 0;
      });
  }

  getSellerProductCount(userId: number) {
    this.productService.getSellerInfo(userId).subscribe(data => {
      this.member.listedItems = data;
    });
  }

  openItemsSold() {
    this.pressItemsSold = true;
  }

  openItems() {
    this.pressItemsSold = false;
  }
}
