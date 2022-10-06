import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from '../../../../../core/services/account.service';
import { AcceptTermsModel } from '@shared/models/accept-terms.interface';
import { TermsEnum } from '../../../../../shared/enums/terms.enum';
import { UserService } from '../../../../../core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserData } from '@schemas/user.interface';
import { SegmentService } from '@services/segment.service';

@Component({
  selector: 'app-accept-terms',
  templateUrl: './accept-terms.component.html',
  styleUrls: ['./accept-terms.component.scss'],
})
export class AcceptTermsComponent implements OnInit {
  constructor(
    private spinnerService: NgxSpinnerService,
    private accountService: AccountService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private segmentService: SegmentService
  ) {}

  mainForm = new FormGroup({});
  user_id: number;
  alreadyAccepted = false;
  hasReadTerms = false;
  user: UserData;

  ngOnInit(): void {
    this.loadData();
    this.createForm();
  }

  createForm() {
    this.mainForm = this.formBuilder.group({
      terms_and_conditions: [false, Validators.required],
    });
  }

  loadData() {
    this.userService.getUserData().subscribe(data => {
      this.user_id = data?.id;
      this.user = data;

      if (this.user) {
        // prevents null exception
        this.loadAcceptTerms();
      }
    });
  }

  loadAcceptTerms() {
    this.spinnerService.show();
    this.accountService.getAcceptTerms(this.user_id, TermsEnum.PRO_SELLERS_TERMS).subscribe(data => {
      if (data?.accepted) this.alreadyAccepted = true;

      this.spinnerService.hide();
    });
  }

  public onSubmit(): void {
    this.spinnerService.show();

    const acceptTerms = {
      user_id: this.user_id,
      term_id: TermsEnum.PRO_SELLERS_TERMS,
      accepted: true,
    } as AcceptTermsModel;

    this.accountService.acceptTerms(acceptTerms).subscribe(async response => {
      if (response) {
        this.userService.refreshUser(this.user_id);
        this.loadAcceptTerms();
        this.segmentService.AcceptTerms(this.user.email, this.user.company_name, 'Pro Seller Terms');
      }

      this.spinnerService.hide();
    });
  }

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 240) this.hasReadTerms = true;
  }
}
