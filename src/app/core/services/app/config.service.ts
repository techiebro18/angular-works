import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { APP_CONSTANTS } from '@shared/constants/app-constants';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  get maxFileUploadSize(): number {
    return environment.PRODUCT_IMAGE_UPLOAD_SIZE;
  }

  get resellForFreeTimeInterval(): number {
    return APP_CONSTANTS.RESELL_FOR_FREE_AVAILABILITY_IN_HOURS;
  }

  get resellForFReeTVBComssionPercent(): number {
    return APP_CONSTANTS.RESELL_FOR_FREE_TVB_COMMISSION_PERCENT || 0;
  }
}
