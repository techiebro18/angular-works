import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  @Output() activeAppHeader = new EventEmitter<any>();

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.addAppHeader(this.route.snapshot.firstChild.routeConfig.path);
    });
  }
  addAppHeader(value: any) {
    this.activeAppHeader.emit(value);
  }
}
