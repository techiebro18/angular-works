import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { environment } from '@environments/environment';
import { ConfigService } from '@services/app/config.service';
import { ScreenDetectorService } from '@services/app/screen-detector.service';
import { CompressImageService } from '@services/common/compress-image.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoaderService } from '@services/app/loader.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploaderComponent implements OnInit, OnChanges {
  @Input() id: string | undefined;
  @Input() uploadedFile: File | null = null;
  @Input() mainImageTemp: string | undefined;
  @Input() maxFileUploadSize: number;
  @Input() fixedOverlayInfo = false;
  @Input() compress = false;
  @Input() layoutTheme = 'default';
  @Output() fileChange: EventEmitter<File | null> = new EventEmitter();
  @Output() fileSizeError: EventEmitter<void> = new EventEmitter();
  @Output() fileTypeError: EventEmitter<void> = new EventEmitter();
  uploadedImagePreview: any;
  showAddImageInfoOverlay = false;
  isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  validFileTypes: string[] = ['png', 'jpg', 'jpeg', 'heic'];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private configService: ConfigService,
    private screenSizeDetector: ScreenDetectorService,
    private compressImage: CompressImageService
  ) {}

  ngOnInit(): void {
    this.isMobile$ = this.screenSizeDetector.isMobile;
    this.mainImageTemp
      = this.mainImageTemp != null
        ? this.mainImageTemp.replace(
          'https://thevintagebardev.imgix.net/',
          environment.PRODUCT_IMGIX_URL
        )
        : null;

    if (!this.id) {
      this.id = this.getRandomString();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.uploadedFile && changes.uploadedFile.currentValue) {
      if (changes.uploadedFile.currentValue.id) {
        this.uploadedImagePreview = changes.uploadedFile.currentValue.large_url;
      }
      else {
        this.doUpload(changes.uploadedFile.currentValue, false);

        return;
      }
    }
  }

  onFileChange($event): void {
    if (!$event.target.files || !$event.target.files.length) return;

    this.doUpload($event.target.files[0] as File, true);
  }

  private doUpload(file: File, emitToOutput: boolean) {
    if (!this.isFileTypeValid(file)) {
      this.fileTypeError.emit();

      return;
    }

    if (!this.validateSizeOfTheFile(file)) {
      this.fileSizeError.emit();

      return;
    }

    const isHeic = /hei(c|f)/i.test(file.name);
    const reader = new FileReader();

    reader.readAsDataURL(file);

    if (!isHeic) {
      reader.onload = this.processImage(reader, file, emitToOutput);
    }
    else {
      this.processImage(reader, file, emitToOutput);
    }
  }

  private processImage(reader: FileReader, file: File, emitToOutput: boolean) {
    return async (resultProgress: ProgressEvent<FileReader>) => {
      this.uploadedImagePreview = reader.result;

      if (this.compress) {
        const compressedImage = await this.compressImage.compress(file).pipe(take(1)).toPromise();

        this.uploadedFile = compressedImage;
      }
      else {
        this.uploadedFile = file;
      }

      if (emitToOutput) {
        this.fileChange.emit(this.uploadedFile as File);
      }

      this.changeDetectorRef.detectChanges();
    };
  }

  public clearImage(): void {
    this.uploadedFile = null;
    this.uploadedImagePreview = null;
    this.mainImageTemp = null;
    this.fileChange.emit(null);
  }

  public getRandomString(length = 10): string {
    const randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    return result;
  }

  private validateSizeOfTheFile(file): boolean {
    const validationSize = this.maxFileUploadSize || this.configService.maxFileUploadSize;

    if (validationSize) {
      return file.size / Math.pow(1024, 2) < validationSize;
    }
    else {
      return true;
    }
  }

  private isFileTypeValid(file: File): boolean {
    return this.validFileTypes.includes(file.name.split('.').pop().toLowerCase());
  }
}
