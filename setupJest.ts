require('zone.js/dist/zone.js');
require('zone.js/testing');
require('jest-preset-angular');
const {TestBed} = require('@angular/core/testing');
const { BsModalService, BsModalRef, ModalModule, ModalContainerComponent } = require('ngx-bootstrap/modal');
const { TranslateModule } = require('@ngx-translate/core');

global['css'] = null;

declare module global {
  interface Window {
    analytics: any;
    consentManagerConfig: any;
  }
}

const {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} = require('@angular/platform-browser-dynamic/testing');

beforeAll(async () => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

  (global as any).analytics = {
    identify: jest.fn(),
    page: jest.fn(),
    track: jest.fn(),
  };

  await TestBed.configureTestingModule({
    imports: [
      ModalModule.forRoot(),
      TranslateModule.forRoot(),
    ],
    entryComponents: [BsModalRef],
  }).compileComponents();
});

beforeEach(() => {
  (global as any).analytics = {
    identify: jest.fn(),
    page: jest.fn(),
    track: jest.fn(),
  };
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    }
  }
});
