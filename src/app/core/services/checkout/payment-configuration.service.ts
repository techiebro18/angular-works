import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '@services/checkout/models/payment-configuration';
import { CheckoutService } from '@services/checkout/checkout.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private configData: Configuration;
  constructor(private http: HttpClient, private _checkoutService: CheckoutService) {}

  async loadConfiguration(payCurrencyId: number) {
    try {
      return (this.configData = await this._checkoutService
        .paymentConfiguration(payCurrencyId)
        .toPromise());
    }
    catch (err) {
      return Promise.reject(err);
    }
  }

  get config(): Configuration {
    return this.configData;
  }
}
