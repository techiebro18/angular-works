import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-became-pro-seller',
  templateUrl: './became-pro-seller.component.html',
  styleUrls: ['./became-pro-seller.component.scss'],
})
export class BecameProSellerComponent implements OnInit {
  constructor(private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document) {}

  ngOnInit(): void {
    this.applySettings();
  }

  applySettings() {
    const script = this._renderer2.createElement('script');

    script.src = '//embed.typeform.com/next/embed.js';

    this._renderer2.appendChild(this._document.body, script);
  }
}
