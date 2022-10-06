import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData } from '@schemas/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@services/app/loader.service';
import { BrandService } from '@services/brand.service';
import { UserService } from '@services/user.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '@services/product.service';
import { ProductGalleryImage } from '@schemas/product.interface';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '@services/app/config.service';

@Component({
  selector: 'app-product-item-edit-dialog',
  templateUrl: './product-item-edit-dialog.component.html',
  styleUrls: ['./product-item-edit-dialog.component.scss'],
})
export class ProductItemEditDialogComponent implements OnInit {
  public user: BehaviorSubject<UserData | null> | null = null;
  public submitted = false;
  public productInformationForm: FormGroup | undefined;
  public product: any = null;
  public currencies: any = null;
  public mainImage: { file: any; id?: any } = { file: null };
  public secondaryImages = Array(8).fill({ file: null });
  public secondaryImagesCopy = Array(8).fill({ file: null });
  public fakeDataForDropListFirstLine = Array(4).fill({ file: null });
  public fakeDataForDropListSecondLine = Array(4).fill({ file: null });
  public listIndexEntered = 0;
  public itemPictureDescription = false;
  public productUpdateErrorMessage: string | null = null;
  public productId: number;
  public imageUploadSizeError = false;
  public maxUploadFileSize: { fileSize: number } | null;
  private submitting = false;
  private isMobile = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private loaderService: LoaderService,
    private brandService: BrandService,
    private userService: UserService,
    private ref: ChangeDetectorRef,
    private translateService: TranslateService,
    public dialogRef: MatDialogRef<ProductItemEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private configService: ConfigService
  ) {
    this.user = this.userService.getUserData();
  }

  ngOnInit(): void {
    this.product = this.data?.data?.productData;
    this.productId = this.product.id;
    this.loadData();
    this.setupForm();
  }

  public async submitForm(close = false): Promise<void> {
    this.submitted = true;

    if (this.productInformationForm && !this.productInformationForm.invalid) {
      const formData = this.productInformationForm.getRawValue();

      this.loaderService.triggerLoading.emit(true);
      const productData: any = {};

      if (!this.mainImage.id) {
        productData.productImage = formData.productImage;
      }

      const formDataUpdate = new FormData();

      for (const prop in productData) {
        formDataUpdate.append(prop, productData[prop]);
      }

      for (const secondaryIMage of this.secondaryImages) {
        if (secondaryIMage.file && !secondaryIMage.file.id) {
          formDataUpdate.append('productGallery[]', secondaryIMage.file, secondaryIMage.name);
        }
      }

      this.secondaryImages = Array(8).fill({ file: null });
      this.productService.updateProductGallery(this.productId, formDataUpdate).subscribe(
        response => {
          if (close) {
            this.dialogRef.close();
          }
          else {
            this.loadData();
          }

          this.hideErrorMessage();
          this.loaderService.triggerLoading.emit(false);
        },
        err => {
          this.loaderService.triggerLoading.emit(false);
          this.showErrorMessage('update');
        }
      );
    }
  }

  private loadData(): void {
    this.hideErrorMessage();
    this.maxUploadFileSize = { fileSize: this.configService.maxFileUploadSize };
    this.secondaryImages = Array(8).fill({ file: null });
    this.loaderService.triggerLoading.emit(true);
    this.productService.getProductFromAdminServices(this.productId).subscribe(
      product => {
        this.product = product;
        const secondaryImages = this.product
          ? this.product.media_entities
          : [];
        const existingFiles = secondaryImages
          .sort(this.imageSortFunction)
          .map(productGalleryImage => {
            productGalleryImage.id = productGalleryImage.uuid;

            return {
              file: productGalleryImage,
              id: productGalleryImage.uuid,
            };
          });

        this.secondaryImages.splice(0, existingFiles.length, ...existingFiles);
        this.formFakeDataDropLists();

        if (this.product.productUpload) {
          const mainImageId = this.product.productUpload.uuid;

          this.product.productUpload.id = mainImageId;
          this.mainImage = {
            file: this.product.productUpload,
            id: mainImageId,
          };
          const data: any = {
            productImage: this.mainImage.file,
          };

          (this.productInformationForm as FormGroup).patchValue(data);
        }
        else {
          this.mainImage = { file: null };
        }

        this.loaderService.triggerLoading.emit(false);
      },
      error => {}
    );
  }

  private setupForm(): void {
    const formAttributes = {
      productImage: [null, Validators.required],
    };

    this.productInformationForm = this.formBuilder.group(formAttributes);
  }

  public onFileChange($event: File | null, controlName: string): void {
    this.hideErrorMessage();

    if (!$event) {
      if (this.mainImage.id) {
        const uploadId = this.mainImage.file.uuid;

        this.loaderService.triggerLoading.emit(true);
        this.productService
          .removeProductImage(this.user.getValue().id, uploadId, this.product.id)
          .subscribe(() => {
            this.loadData();
            this.loaderService.triggerLoading.emit(true);
          });
      }
    }
    else {
      const data: any = {};

      data[controlName] = $event;
      this.mainImage = { file: $event };
      (this.productInformationForm as FormGroup).patchValue(data);
      this.submitForm();
      this.formFakeDataDropLists();
    }
  }

  public onSecondaryImagesAdd($event: File | null, index: number): void {
    this.hideErrorMessage();

    if (!$event) {
      if (this.secondaryImages[index].file?.id) {
        const uploadId = this.secondaryImages[index].file.id;

        this.loaderService.triggerLoading.emit(true);
        this.productService
          .removeProductImage(this.user.getValue().id, uploadId, this.product.id)
          .pipe(
            finalize(() => {
              this.loaderService.triggerLoading.emit(false);
              this.loadData();
            })
          )
          .subscribe(
            () => {
              this.hideErrorMessage();
              this.secondaryImages[index] = { file: $event };
              this.formFakeDataDropLists();
            },
            error => {
              this.showErrorMessage('update');
            }
          );
      }
      else {
        this.secondaryImages[index] = { file: $event };
        this.formFakeDataDropLists();
      }
    }
    else {
      this.secondaryImages[index] = { file: $event };
      this.formFakeDataDropLists();
      this.submitForm();
    }
  }

  public dropFiles($event: File[]): void {
    this.hideErrorMessage();

    if (!this.mainImage.file) {
      this.onFileChange($event[0], 'productImage');
      this.mainImage = { file: $event.shift() };
    }

    for (let i = 0; i < this.secondaryImages.length; i++) {
      const existingFile = this.secondaryImages[i];

      if (!existingFile.file) {
        this.secondaryImages[i] = { file: $event.shift() };
      }
    }

    this.submitForm();
    this.formFakeDataDropLists();
    this.ref.detectChanges();
  }

  public drop(event: CdkDragDrop<any>): void {
    if (event.previousContainer.id === 'mainImageCdkDropListContainer') {
      const galleryImage = event.container.data.item;
      const galleryImageId = galleryImage.file?.id
        ? galleryImage.file.id
        : 0;

      if (galleryImageId) {
        this.productService.swapMainImageWithGalleryImage(this.productId, galleryImageId).subscribe(
          () => {
            this.loadData();
            this.hideErrorMessage();
          },
          error => {
            this.showErrorMessage('update');
          }
        );
      }

      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(this.fakeDataForDropListFirstLine, event.previousIndex, event.currentIndex);
    }
    else {
      this.secondaryImages[event.previousContainer.data.index] = event.container.data.item;
      this.secondaryImages[event.container.data.index] = event.previousContainer.data.item;
      /*  transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      transferArrayItem(event.container.data, event.previousContainer.data, event.previousContainer.data.length, 0);*/
    }

    this.sortImages();
    this.ref.detectChanges();
  }

  public dropMainImage(event: CdkDragDrop<any>): void {
    this.hideErrorMessage();

    if (event.previousContainer !== event.container) {
      const temporaryArray = [this.mainImage];

      transferArrayItem(
        this.secondaryImages,
        temporaryArray,
        event.previousContainer.data.index,
        1
      );
      this.secondaryImages.unshift(this.mainImage);
      this.mainImage = temporaryArray[1];

      if (this.mainImage.file?.id) {
        this.productService
          .swapMainImageWithGalleryImage(this.productId, this.mainImage.file.id)
          .subscribe(
            () => {
              this.loadData();
              this.hideErrorMessage();
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

  private sortImages(): void {
    const images = this.secondaryImages
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
    this.fakeDataForDropListSecondLine = images.slice(
      this.secondaryImages.length / 2,
      this.secondaryImages.length
    );
    this.orderImages(this.secondaryImages);
  }

  private formFakeDataDropLists(): void {
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
    this.fakeDataForDropListSecondLine = images.slice(
      this.secondaryImages.length / 2,
      this.secondaryImages.length
    );
  }

  public showErrorMessage(
    errorType: 'create' | 'update' | 'imageFileSize',
    message?: string
  ): void {
    let translatedMessage;

    if (!message) {
      if (errorType === 'imageFileSize') {
        translatedMessage = this.translateService.instant(
          'ERRORS.FILE_SIZE_ERROR',
          this.maxUploadFileSize
        );
      }
      else {
        translatedMessage = this.translateService.instant('ERRORS.GENERAL_INTERNAL_SERVER_ERROR');
      }
    }

    this.productUpdateErrorMessage = message
      ? message
      : translatedMessage;
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
    this.loaderService.triggerLoading.emit(true);

    const orderingImages = images
      .filter(image => image.file?.id)
      .map(image => {
        image.file.imgix_url = 'yes';

        return image.file;
      });

    this.productService
      .updateProductGalleryOrder(this.productId, orderingImages)
      .pipe(
        finalize(() => {
          this.loaderService.triggerLoading.emit(false);
        })
      )
      .subscribe(
        () => {
          this.loadData();
          this.hideErrorMessage();
        },
        error => () => {
          this.showErrorMessage('update');
        }
      );
  }

  private imageSortFunction(prev, next): number {
    if (prev.order === next.order) {
      return 0;
    }

    if (prev.order > next.order) {
      return 1;
    }
    else {
      return -1;
    }
  }
}
