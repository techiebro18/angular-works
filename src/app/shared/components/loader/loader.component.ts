import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/app/loader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  loading = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.triggerLoading.subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }

  ngOnInit(): void {}
}
