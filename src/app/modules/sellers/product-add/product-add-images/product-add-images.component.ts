import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserData } from '@schemas/user.interface';
import { ConfigService } from '@services/app/config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScreenDetectorService } from '@services/app/screen-detector.service';
import { ProductApprovalService } from '@services/product-approval.service';
import { SegmentService } from '@services/segment.service';
import { UserService } from '@services/user.service';
import { SegmentProductUploadStatusEnum, SegmentProductUploadStepNameEnum } from '@shared/enums/segment.enum';
import '@shared/utils/array.extensions';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { StepsService } from '@services/app/steps.service';
import { ProductAddStepsEnum } from '../product-add.component';

@Component({
  selector: 'app-product-add-images',
  templateUrl: './product-add-images.component.html',
  styleUrls: ['./product-add-images.component.scss'],
})
export class ProductAddImagesComponent implements OnInit {
  public user: BehaviorSubject<UserData | null> | null = null;
  public submitted = false;
  public productForm: FormGroup | undefined;
  public productApproval: any = null;
  public mainImage: { file: any; id?: any } = { file: null };
  public secondaryImages = Array(8).fill({ file: null });
  public fakeDataForDropListFirstLine = Array(4).fill({ file: null });
  public fakeDataForDropListSecondLine = Array(4).fill({ file: null });
  public listIndexEntered = 0;
  public productUpdateErrorMessage: string | null = null;
  public maxUploadFileSize: { fileSize: number } | null;
  public isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showAddImageInfoOverlay = false;
  private imagesToDelete: string[] = [];
  private submitting = false;
  private isMobile = false;
  public minUploadFilesAmount = 3;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productApprovalService: ProductApprovalService,
    private spinnerService: NgxSpinnerService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService,
    private screenDetectorService: ScreenDetectorService,
    private segmentService: SegmentService,
    private configService: ConfigService,
    private stepsService: StepsService,
    private screenSizeDetector: ScreenDetectorService
  ) {
    this.user = this.userService.getUserData();
  }

  ngOnInit(): void {
    this.listenToMobileDetector();
    this.isMobile$ = this.screenSizeDetector.isMobile;
    this.loadData();
    this.stepsService.setCurrentStepIndex(ProductAddStepsEnum.PICTURES);
    this.segmentService.track(SegmentProductUploadStatusEnum.STARTED, {
      step: 2,
      step_name: SegmentProductUploadStepNameEnum.STEP_2,
    });
  }

  public async submitForm(): Promise<void> {
    this.hideErrorMessage();
    this.submitted = true;

    if (!this.isEnoughSecondaryPhotosUploaded()) {
      this.showErrorMessage('imageAmount');

      return;
    }

    this.findInvalidControls(this.productForm);

    if (this.productForm && !this.productForm.invalid && !this.submitting) {
      this.submitting = true;
      this.spinnerService.show();

      const formDataUpdate = new FormData();

      formDataUpdate.append('productImage', this.mainImage.file);

      for (const photo of this.secondaryImages) {
        if (photo.file) {
          formDataUpdate.append('productGallery[]', photo.file);
        }
      }

      this.productApprovalService
        .updateProductGallery(this.productApproval.id, formDataUpdate, this.imagesToDelete)
        .pipe(
          finalize(() => {
            this.spinnerService.hide();
            this.submitting = false;
          })
        )
        .subscribe(
          () => {
            this.sendSegmentTrack();
            this.stepsService.markIndexAsCompleted(ProductAddStepsEnum.PICTURES);
            this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.PICTURES);
            this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.GET_PAID);
            this.stepsService.setCurrentStepIndex(ProductAddStepsEnum.GET_PAID);
            this.stepsService.broadcastModelChanges();
            this.router.navigate([`/sellers/product-add/get-paid/${this.productApproval.id}`]);
          },
          err => {
            this.showErrorMessage('update');
          }
        );
    }
  }

  private sendSegmentTrack(): void {
    this.segmentService.track(SegmentProductUploadStatusEnum.STEP_COMPLETED, {
      step: 2,
      step_name: SegmentProductUploadStepNameEnum.STEP_2,
      images_count: this.mainImage?.file
        ? 1 + this.secondaryImages.filter(_ => _.file).length
        : this.secondaryImages.filter(_ => _.file).length,
      images_formats: this.getImagesExtensions(),
    });
  }

  public async loadData(): Promise<void> {
    const productId = this.route.snapshot.paramMap.get('id');

    this.stepsService.setStashItem('productApprovalId', productId);
    this.maxUploadFileSize = { fileSize: this.configService.maxFileUploadSize };

    if (productId) {
      this.spinnerService.show();
      const productApproval = await this.productApprovalService.get(productId).toPromise();

      if (productApproval) {
        this.productApproval = productApproval;
        this.setupForm();

        const secondaryImages = this.productApproval.media_entities || [];
        const existingFiles = secondaryImages.map(productGalleryImage => {
          if (!productGalleryImage.id) {
            productGalleryImage.id = productGalleryImage.uuid;
          }

          return {
            file: productGalleryImage,
            id: productGalleryImage.uuid,
          };
        });

        this.secondaryImages.splice(0, existingFiles.length, ...existingFiles);
        this.updateDropLists();

        if (this.productApproval.productUpload) {
          const mainImageId = this.productApproval.productUpload.uuid;

          this.productApproval.productUpload.id = mainImageId;
          this.mainImage = {
            file: this.productApproval.productUpload,
            id: mainImageId,
          };
          const data: any = {
            productImage: this.mainImage.file,
          };

          this.productForm.patchValue(data);
        }
        else {
          this.mainImage = { file: null };
        }

        this.setupStepsStatus();

        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
        this.router.navigate(['/sellers/seller-contact']);
      }
    }
  }

  public onMainPhotoChange(eventFile: File | null, controlName: string): void {
    this.hideErrorMessage();

    if (!eventFile && this.mainImage.id) {
      this.imagesToDelete.push(this.mainImage.id);
    }

    const data: any = {};

    data[controlName] = eventFile;
    this.mainImage = { file: eventFile };
    this.productForm.patchValue(data);
    this.updateDropLists();
  }

  public onSecondaryPhotosChange(eventFile: File | null, index: number): void {
    this.hideErrorMessage();

    if (!eventFile && this.secondaryImages[index].file?.id) {
      this.imagesToDelete.push(this.secondaryImages[index].file.id);
    }

    this.secondaryImages[index] = { file: eventFile };
    this.updateDropLists();
  }

  public dropFiles($event: File[]): void {
    this.hideErrorMessage();

    if (!this.mainImage.file) {
      this.onMainPhotoChange($event[0], 'productImage');
      this.mainImage = { file: $event.shift() };
    }

    for (let i = 0; i < this.secondaryImages.length; i++) {
      const existingFile = this.secondaryImages[i];

      if (!existingFile.file) {
        this.secondaryImages[i] = { file: $event.shift() };
      }
    }

    this.updateDropLists();
    this.changeDetectorRef.detectChanges();
  }

  public drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer.id === 'mainImageCdkDropListContainer') {
      const galleryImage = event.container.data[0];
      const galleryImageId = galleryImage.file?.id
        ? galleryImage.file.id
        : 0;

      transferArrayItem([this.mainImage], event.container.data, 0, event.currentIndex);
      this.mainImage = this.fakeDataForDropListFirstLine.shift();
      this.spinnerService.show();
      this.productApprovalService
        .swapMainImageWithGalleryImage(this.productApproval.id, galleryImageId)
        .pipe(
          finalize(() => {
            this.spinnerService.hide();
          })
        )
        .subscribe(
          () => {
            this.loadData();
          },
          error => {
            this.showErrorMessage('update');
          }
        );

      return;
    }

    const previousIndex = this.isMobile
      ? this.getRightIndexesForMobile(event.previousIndex)
      : event.previousIndex;
    const currentIndex = this.isMobile
      ? this.getRightIndexesForMobile(event.currentIndex)
      : event.currentIndex;

    if (event.previousContainer === event.container) {
      moveItemInArray(this.fakeDataForDropListFirstLine, previousIndex, currentIndex);
    }
    else {
      transferArrayItem(event.previousContainer.data, event.container.data, previousIndex, currentIndex);
      transferArrayItem(event.container.data, event.previousContainer.data, event.previousContainer.data.length, 0);
    }

    this.sortImages();
    this.changeDetectorRef.detectChanges();
  }

  public dropSecondList(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer.id === 'mainImageCdkDropListContainer') {
      transferArrayItem([this.mainImage], event.container.data, 0, event.currentIndex - 1);
      this.mainImage = this.fakeDataForDropListFirstLine.shift();
      const galleryImage = this.mainImage;
      const galleryImageId = galleryImage.file?.id
        ? galleryImage.file.id
        : 0;

      this.spinnerService.show();
      this.productApprovalService.swapMainImageWithGalleryImage(this.productApproval.id, galleryImageId).subscribe(
        () => {
          this.loadData();
        },
        error => {
          this.spinnerService.hide();
          this.showErrorMessage('update');
        }
      );

      return;
    }

    const previousIndex = this.isMobile
      ? this.getRightIndexesForMobile(event.previousIndex)
      : event.previousIndex;
    const currentIndex = this.isMobile
      ? this.getRightIndexesForMobile(event.currentIndex)
      : event.currentIndex;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, previousIndex, currentIndex);
    }
    else {
      transferArrayItem(event.previousContainer.data, event.container.data, previousIndex, currentIndex);
      transferArrayItem(event.container.data, event.previousContainer.data, 0, event.previousContainer.data.length);
    }

    this.sortImages();
    this.changeDetectorRef.detectChanges();
  }

  public dropMainImage(event: CdkDragDrop<any[]>): void {
    this.hideErrorMessage();

    if (event.previousContainer !== event.container) {
      const temporaryArray = [this.mainImage];
      const index = this.isMobile
        ? this.getRightIndexesForMobile(event.previousIndex)
        : event.previousIndex;

      transferArrayItem(event.previousContainer.data, temporaryArray, index, 1);
      transferArrayItem(temporaryArray, event.previousContainer.data, 0, 0);
      this.mainImage = temporaryArray[0];

      if (this.mainImage.file?.id) {
        this.productApprovalService
          .swapMainImageWithGalleryImage(this.productApproval.id, this.mainImage.file.id)
          .subscribe(
            () => {
              this.loadData();
            },
            error => {
              this.showErrorMessage('update');
            }
          );
      }
      else {
        this.sortImages();
      }
    }
  }

  public showErrorMessage(
    errorType: 'create' | 'update' | 'imageFileSize' | 'imageFileType' | 'imageAmount',
    message?: string
  ): void {
    let translatedMessage;

    if (!message) {
      if (errorType === 'imageFileSize') {
        translatedMessage = this.translateService.instant('ERRORS.FILE_SIZE_ERROR', this.maxUploadFileSize);
      }
      else if (errorType === 'imageFileType') {
        translatedMessage = this.translateService.instant('ERRORS.FILE_TYPE_ERROR');
      }
      else if (errorType === 'imageAmount') {
        translatedMessage = this.translateService.instant('ERRORS.PRODUCT_UPLOAD_MIN_IMAGES_AMOUNT', {
          amount: this.minUploadFilesAmount,
        });
      }
      else {
        translatedMessage = this.translateService.instant('ERRORS.GENERAL_INTERNAL_SERVER_ERROR');
      }
    }

    this.productUpdateErrorMessage = message
      ? message
      : translatedMessage;
  }

  public isMainPhotoLoaded(): boolean {
    return this.mainImage.file !== null;
  }

  public isAnySecondaryPhotoSlotEmpty(): boolean {
    return this.secondaryImages.some(x => x.file === null);
  }

  public isAnySecondaryPhotoUploaded(): boolean {
    return this.secondaryImages.some(x => x.file !== null);
  }

  public isEnoughSecondaryPhotosUploaded(): boolean {
    return this.secondaryImages.filter(x => x.file !== null).length >= this.minUploadFilesAmount - 1;
  }

  return;

  public isReadyForNextStep(): boolean {
    return this.isMainPhotoLoaded() || this.productForm.valid;
  }

  private setupStepsStatus(): void {
    this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.PICTURES);

    if (this.isDraftEditingAndFirstStepWasCompletedBefore()) {
      this.stepsService.markIndexAsCompleted(ProductAddStepsEnum.INFO);
      this.stepsService.markIndexAsAvailable(ProductAddStepsEnum.INFO);
      this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.INFO);
    }

    if (this.isDraftEditingAndSecondStepWasCompletedBefore()) {
      this.stepsService.markIndexAsCompleted(ProductAddStepsEnum.PICTURES);

      if (this.isAnySecondaryPhotoUploaded() || this.isMainPhotoLoaded()) {
        this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.INFO);
        this.stepsService.unmarkIndexAsDisabled(ProductAddStepsEnum.GET_PAID);

        this.stepsService.markIndexAsAvailable(ProductAddStepsEnum.GET_PAID);
      }
      else {
        this.stepsService.unmarkIndexAsAvailable(ProductAddStepsEnum.GET_PAID);
        this.stepsService.markIndexAsDisabled(ProductAddStepsEnum.GET_PAID);
      }
    }

    this.stepsService.broadcastModelChanges();
  }

  private setupForm(): void {
    const formAttributes = {
      productImage: [null, Validators.required],
      productGallery: [[]],
    };

    this.productForm = this.formBuilder.group(formAttributes);
  }

  private sortImages(): void {
    const images = [...this.fakeDataForDropListFirstLine, ...this.fakeDataForDropListSecondLine]
      .sort((prev, next) => (!prev.file
        ? 1
        : !next.file
          ? -1
          : 0))
      .map(el => {
        return { file: el.file };
      });

    this.secondaryImages = images;
    this.fakeDataForDropListFirstLine = images.slice(0, this.secondaryImages.length / 2);
    this.fakeDataForDropListSecondLine = images.slice(this.secondaryImages.length / 2, this.secondaryImages.length);
    this.orderImages(this.secondaryImages);
  }

  // material dragndrop has bug and doesn't recognize index if we have 2x2x2x2 blocks

  private updateDropLists(): void {
    const images = this.secondaryImages
      .sort((prev, next) => (!prev.file
        ? 1
        : !next.file
          ? -1
          : 0))
      .map(el => {
        return { file: el.file };
      });

    this.fakeDataForDropListFirstLine = images.slice(0, this.secondaryImages.length / 2);
    this.fakeDataForDropListSecondLine = images.slice(this.secondaryImages.length / 2, this.secondaryImages.length);
  }

  private hideErrorMessage(): void {
    if (this.hasErrorMessage()) {
      this.productUpdateErrorMessage = null;
    }
  }

  private hasErrorMessage(): boolean {
    return !!this.productUpdateErrorMessage;
  }

  private orderImages(images): void {
    this.spinnerService.show();
    const orderingImages = images
      .filter(image => image.file?.id)
      .map(image => {
        image.file.imgix_url = 'yes';

        return image.file;
      });

    this.productApprovalService
      .updateProductGalleryOrder(this.productApproval.id, orderingImages)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
          this.loadData();
        })
      )
      .subscribe(
        () => {},
        error => () => {
          this.showErrorMessage('update');
        }
      );
  }

  // we are mapping right indexes
  private getRightIndexesForMobile(index: number): number {
    const mobileWrongIndexes = [0, 2, 1, 3];

    return mobileWrongIndexes[index];
  }

  private listenToMobileDetector(): void {
    this.screenDetectorService.isMobile.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  private getImagesExtensions(): string {
    const imagesFormats: string[] = [];

    imagesFormats.push(this.mainImage.file.type);

    for (const image of this.secondaryImages) {
      if (image.file) {
        imagesFormats.push(image.file.type);
      }
    }

    return imagesFormats.makeString('', ', ', '', '.');
  }

  private isDraftEditingAndFirstStepWasCompletedBefore(): boolean {
    return this.productApproval !== null && this.productApproval !== undefined;
  }

  private isDraftEditingAndSecondStepWasCompletedBefore(): boolean {
    return (
      this.productApproval !== null
      && this.productApproval !== undefined
      && (this.productApproval.image_link || this.productApproval.media_entities.length > 0)
    );
  }

  private findInvalidControls(form: FormGroup): any {
    const invalidControls = [];

    for (const name in form.controls) {
      if (form.controls[name].invalid) {
        invalidControls.push(name);
      }
    }

    return invalidControls;
  }
}
