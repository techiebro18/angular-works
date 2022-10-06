import { Injectable } from '@angular/core';
import { UniversalService } from './universal.service';

class LocalStorage implements Storage {
  [name: string]: any;
  readonly length: number;
  clear(): void {}
  getItem(key: string): string | null {
    return undefined;
  }
  key(index: number): string | null {
    return undefined;
  }
  removeItem(key: string): void {}
  setItem(key: string, value: string): void {}
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {
  private storage: Storage;

  constructor(private universalService: UniversalService) {
    this.storage = new LocalStorage();

    if (this.universalService.isBrowser) {
      this.storage = localStorage;
    }
  }

  [name: string]: any;

  length: number;

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key) || null;
  }

  key(index: number): string | null {
    return this.storage.key(index) || null;
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }
}
