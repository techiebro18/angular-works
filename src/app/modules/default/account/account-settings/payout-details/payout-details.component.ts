import { Component, OnInit } from '@angular/core';
import { FinancialService } from '@services/financial.service';
import { UserService } from '@services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payout-details',
  templateUrl: './payout-details.component.html',
  styleUrls: ['./payout-details.component.scss'],
})
export class PayoutDetailsComponent implements OnInit {
  public payoutDetail: any;
  constructor(
    private userService: UserService,
    private financialService: FinancialService,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.loadData();
  }

  public loadData(): void {
    const user = this.userService.getUserData().getValue();
    const orderId: number = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));

    this.financialService.getPayoutDetail(user.id, orderId).subscribe((res: any) => {
      this.payoutDetail = res.list;
    });
  }
}
