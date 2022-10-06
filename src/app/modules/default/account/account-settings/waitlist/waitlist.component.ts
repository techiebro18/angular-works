import { MetaService } from '@services/app/meta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UniversalService } from '@services/universal.service';
import { WaitlistService } from '@services/waitlist.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WaitlistItem } from '@shared/models/waitlist-item.model';

@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.scss'],
})
export class WaitlistComponent implements OnInit {
  baseRemoteUrl = '';
  waitlistItems: WaitlistItem[];
  modalRef: BsModalRef;
  form: FormGroup;
  submitted = false;
  id: any = null;
  error_checked: any;
  ispopUpShow = false;
  Reasons: Array<any> = [
    { name: 'Already purchased from the vintage bar' },
    { name: 'Purchased from somewhere else' },
    { name: 'Don\'t want to buy this item anymore' },
    { name: 'Other' },
  ];
  errorMessage = '';
  @ViewChild('deleteWaitlistPopup') deleteWaitlistPopup: TemplateRef<any>;

  constructor(
    public waitlistService: WaitlistService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private universalService: UniversalService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.metaService.getStaticPageMeta('account/waitlist-overview', '', 'Waitlist');
    this.baseRemoteUrl = this.universalService.getApplicationUrl();
    this.waitlistService.getUserWaitlist().subscribe({
      next: data => {
        this.waitlistItems = data.list;
      },
      error: err => {
        this.errorMessage = err;
      },
    });
    this.createForm();
  }

  public openDeletePopup(deleteWaitlistPopup: TemplateRef<any>, waitlistID: number) {
    this.ispopUpShow = true;
    this.id = waitlistID;
    this.modalRef = this.modalService.show(deleteWaitlistPopup, {
      animated: true,
      // backdrop: 'static',
    });
  }

  public createForm() {
    return (this.form = this.formBuilder.group({
      reason: this.formBuilder.array([]),
      id: [this.id],
    }));
  }

  public onCheckboxChange(e) {
    const reason: FormArray = this.form.get('reason') as FormArray;

    if (e.target.checked) {
      reason.push(new FormControl(e.target.value));
      this.error_checked = false;
    }
    else {
      let i = 0;

      reason.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          reason.removeAt(i);

          return;
        }

        i++;
      });
    }
  }

  public submitForm() {
    this.submitted = true;
    this.modalRef.hide();
    this.spinnerService.show();
    const formData = new FormData();

    if (
      this.form.get('reason').value == ''
      || this.form.get('reason').value == []
      || this.form.get('reason').value == [null]
    ) {
      this.openDeletePopup(this.deleteWaitlistPopup, this.id);
      this.error_checked = true;
      this.spinnerService.hide();
      this.submitted = false;
    }
    else {
      this.error_checked = false;
      formData.append('id', this.id);
      formData.append('reason', this.form.get('reason').value);
      this.waitlistService.deleteWaitlist(formData).subscribe({
        next: data => {
          if (data.message === 'SUCCESS') {
            this.ngOnInit();
            this.spinnerService.hide();
          }
        },
        error: err => {
          this.errorMessage = err;
          this.spinnerService.hide();
        },
      });
    }
  }

  public closePopup() {
    this.form.reset();
    this.ispopUpShow = false;
    this.modalRef.hide();
  }

  public getTagsFormatted(waitlistItem: WaitlistItem): string {
    let tagsText = '';

    waitlistItem.category.forEach(_ => (tagsText += _.name + ', '));
    waitlistItem.designer.forEach(_ => (tagsText += _.name + ', '));
    waitlistItem.motherpage.forEach(_ => (tagsText += _.name + ', '));
    waitlistItem.discover.forEach(_ => (_.name
      ? (tagsText += _.name + ', ')
      : (tagsText += _.ename + ', ')));
    waitlistItem.color.forEach(_ => (tagsText += _.color + ', '));
    waitlistItem.shoessize.forEach(_ => (tagsText += _.size_euro + ', '));
    waitlistItem.clothsize.forEach(_ => (tagsText += _.size + ', '));
    waitlistItem.bagsize.forEach(_ => (tagsText += _.size + ', '));
    waitlistItem.material.forEach(_ => (tagsText += _.name + ', '));

    // Removes last ', '
    tagsText = tagsText.substring(0, tagsText.length - 2);

    return tagsText;
  }
}
