import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

interface IFileDropDataOutput {
  target: {
    files: File[];
  };
}

@Directive({
  selector: '[appDrag]',
})
export class DragDirective {
  @Output() files: EventEmitter<IFileDropDataOutput> = new EventEmitter();

  @HostBinding('style.background') private background = 'transparent';

  @HostListener('dragover', ['$event'])
  public onDragOver(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'transparent';
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'transparent';

    if (evt.dataTransfer) {
      const files = evt.dataTransfer.files;

      this.files.emit({
        target: {
          files: Array.from(files),
        },
      });
    }
  }
}
