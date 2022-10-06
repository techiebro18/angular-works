import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ConfigService } from '@services/app/config.service';

@Component({
  selector: 'app-vintage-bar-droppable-zone',
  templateUrl: './vintage-bar-droppable-zone.component.html',
  styleUrls: ['./vintage-bar-droppable-zone.component.scss'],
})
export class VintageBarDroppableZoneComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('dropZone', { static: true }) dropZoneElement: ElementRef;
  @Output() filesChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() maxFileUploadSize: number;
  @Output() fileSizeError: EventEmitter<void> = new EventEmitter();

  private removeDragleaveListener: () => void;
  private removeDropListener: () => void;

  constructor(private renderer: Renderer2, private configService: ConfigService) {}

  @HostListener('window:dragenter', ['$event'])
  public onWindowDragEnter($event): void {
    this.showDropZone();
  }

  ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.removeDragleaveListener = this.renderer.listen(
      this.dropZoneElement.nativeElement,
      'dragleave',
      $event => {
        this.dropZoneElement.nativeElement.style.display = 'none';
      }
    );
    this.removeDropListener = this.renderer.listen(
      this.dropZoneElement.nativeElement,
      'drop',
      $event => {
        $event.preventDefault();
        this.hideDropZone($event);
      }
    );
  }

  private showDropZone(): void {
    this.dropZoneElement.nativeElement.style.display = 'block';
  }

  private allowDrag(e): void {
    if (true) {
      // Test that the item being dragged is a valid one
      e.dataTransfer.dropEffect = 'copy';
      e.preventDefault();
    }
  }

  private hideDropZone($event): void {
    this.dropZoneElement.nativeElement.style.display = 'none';
  }

  private handleDrop(e): void {
    e.preventDefault();
    this.hideDropZone(e);
  }

  public ngOnDestroy(): void {
    this.removeDragleaveListener();
    this.removeDropListener();
  }

  public onFileChange($event: any): void {
    if ($event.target.files && $event.target.files.length) {
      const files = $event.target.files;

      for (const uploadedFile of files) {
        const isValidSize = this.validateSizeOfTheFile(uploadedFile);

        if (!isValidSize) {
          this.fileSizeError.emit();

          return;
        }
      }

      this.filesChange.emit(files);
      this.hideDropZone($event);
    }
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
}
