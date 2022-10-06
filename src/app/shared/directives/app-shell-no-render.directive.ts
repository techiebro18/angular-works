import { isPlatformServer } from '@angular/common';
import {
  Directive,
  Inject,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appShellNoRender]',
})
export class AppShellNoRenderDirective implements OnInit {
  /**
   * *appShellNoRender: Renders only on client side
   */

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.clear();
    }
    else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
