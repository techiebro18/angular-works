import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  allcolors: any = [];
  constructor(private http: HttpClient) {
    this.getColorCode();
  }

  public getColorCode() {
    this.http.get(`${environment.API_V2_URL}colors_list`).subscribe((response: any) => {
      for (let m = 0; m < response.list.length; m++) {
        this.allcolors[response.list[m].color_en] = response.list[m].code;
        this.allcolors[response.list[m].color_da] = response.list[m].code;
        this.allcolors[response.list[m].color_de] = response.list[m].code;
        this.allcolors[response.list[m].color_sv] = response.list[m].code;
        this.allcolors[response.list[m].color_it] = response.list[m].code;
        this.allcolors[response.list[m].color_es] = response.list[m].code;
        this.allcolors[response.list[m].color_fr] = response.list[m].code;
      }
    });

    return this.allcolors;
  }
}
