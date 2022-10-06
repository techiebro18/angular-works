import { Component, Input, OnInit } from '@angular/core';
import { Seller } from '@schemas/seller.interface';
import { ProductService } from '@services/product.service';
import { UserService } from '@services/user.service';
import { UserRolesEnum } from '@shared/enums/user-roles.enum';

@Component({
  selector: 'tvb-seller-information',
  templateUrl: './tvb-seller-information.component.html',
  styleUrls: ['./tvb-seller-information.component.scss'],
})
export class TvbSellerInformationComponent implements OnInit {
  @Input() userId: number;
  @Input() product: any;
  TVB_USER_ID = 0;
  listedItems: number;
  soldItems: number;
  seller: Seller = null;
  tvbUser = false;
  displayedName: string;

  constructor(private productService: ProductService, private userService: UserService) {}

  ngOnInit(): void {
    this.getSellerProductCount();
    this.getSellerSoldCount();
    this.getSellerInfo();
    this.product.commission_user_type
      = this.product.commission_user_id == 0
        ? 'Professional'
        : this.product.commission_user_type;
  }

  getSellerProductCount() {
    this.productService.getSellerInfo(this.userId).subscribe(data => {
      this.listedItems = data;
    });
  }

  getSellerSoldCount() {
    this.productService.getSellerSoldItems(this.userId).subscribe(data => {
      this.soldItems = data;
    });
  }

  getSellerInfo() {
    if (this.userId == this.TVB_USER_ID) {
      this.tvbUser = true;
      this.seller = {
        id: 0,
        company_name: 'The Vintage Bar',
        first_name: null,
        last_name: null,
        country: 'Denmark',
        image_id: 'assets/images/logo.jpg',
        username: 'the-vintage-bar',
        role_id: 15,
      };
      this.setDisplayedName(this.seller);
    }
    else {
      this.userService.getSeller(this.userId).subscribe(data => {
        if (data) {
          this.seller = data['user'];
          this.setDisplayedName(this.seller);
        }
      });
    }
  }

  private setDisplayedName(seller: Seller) {
    switch (seller.role_id) {
    case UserRolesEnum.PROFESSIONAL_SELLER:
      this.displayedName = seller.id === 0
        ? seller.company_name
        : seller.username ?? seller.company_name;
      break;
    case UserRolesEnum.USER:
    case UserRolesEnum.INFLUENCER:
    default:
      this.displayedName = seller.first_name ?? seller.username;
      break;
    case UserRolesEnum.TVB_ADMIN:
      this.displayedName = seller.company_name ?? seller.username;
      break;
    }
  }
}
