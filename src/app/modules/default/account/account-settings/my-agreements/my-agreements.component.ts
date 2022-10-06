import { Component, OnInit } from '@angular/core';
import { CommissionRateService } from '../../../../../core/services/user/commission-rate.service';
import { UserService } from '../../../../../core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserData } from '@schemas/user.interface';
import { AccountService } from '../../../../../core/services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TermsEnum } from '../../../../../shared/enums/terms.enum';
import { AcceptTermsModel } from '@shared/models/accept-terms.interface';
import { SegmentService } from '@services/segment.service';

@Component({
  selector: 'app-my-agreements',
  templateUrl: './my-agreements.component.html',
  styleUrls: ['./my-agreements.component.scss'],
})
export class MyAgreementsComponent implements OnInit {
  constructor(
    private spinnerService: NgxSpinnerService,
    private userService: UserService,
    private commissionRateService: CommissionRateService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private segmentService: SegmentService
  ) {}

  public mainForm = new FormGroup({});
  alreadyAccepted = false;
  readedTerms = false;
  user: UserData;
  top_commissions: any;
  bottom_commissions: any;

  ngOnInit(): void {
    this.loadData();
    this.createForm();
  }

  createForm() {
    this.mainForm = this.formBuilder.group({
      my_agreements: [false, Validators.required],
    });
  }

  loadData() {
    this.userService.getUserData().subscribe(data => {
      this.user = data;
      this.loadAcceptTerms();
      this.loadCommissionRates();
    });
  }

  loadCommissionRates() {
    this.commissionRateService.getCommissionRate(this.user.id).subscribe(data => {
      if (data) {
        this.top_commissions = JSON.parse(data?.data?.top_commission_rate);
        this.bottom_commissions = JSON.parse(data?.data?.bottom_commission_rate);
      }
    });
  }

  loadAcceptTerms() {
    this.spinnerService.show();
    this.accountService.getAcceptTerms(this.user?.id, TermsEnum.MY_AGREEMENTS).subscribe(data => {
      if (data?.accepted) this.alreadyAccepted = true;

      this.spinnerService.hide();
    });
  }

  public onSubmit(): void {
    this.spinnerService.show();

    const acceptTerms = {
      user_id: this.user.id,
      term_id: TermsEnum.MY_AGREEMENTS,
      accepted: true,
    } as AcceptTermsModel;

    this.accountService.acceptTerms(acceptTerms).subscribe(response => {
      if (response) {
        this.userService.refreshUser(this.user?.id);
        this.loadAcceptTerms();
        const commissionRates = this.setCommissionRates();

        this.segmentService.AcceptTermsMyAgreements(
          this.user.email,
          this.user.company_name,
          'My Agreements',
          commissionRates
        );
      }

      this.spinnerService.hide();
    });
  }

  setCommissionRates() {
    const commissionRates: any = [];

    this.top_commissions.forEach(item => {
      commissionRates.push({
        commission_rate: item.percentage,
        commission_type: 'top commission',
        end_range: item.to,
        start_range: item.from,
      });
    });
    this.bottom_commissions.forEach(item => {
      commissionRates.push({
        commission_rate: item.percentage,
        commission_type: 'bottom commission',
        end_range: item.to,
        start_range: item.from,
      });
    });
  }

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 100) this.readedTerms = true;
  }
}
