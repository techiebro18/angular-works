import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tvb-badge',
  templateUrl: './tvb-badge.component.html',
  styleUrls: ['./tvb-badge.component.scss'],
})
export class TvbBadgeComponent implements OnInit {
  @Input() styleClass: string;
  @Input() label: string;
  @Input() borderRadius = '15px';
  @Input() backgroundColor = 'var(--main-color-black)';
  @Input() color = 'var(--main-color-white)';
  @Input() padding = '2px 15px';

  constructor() {}

  ngOnInit(): void {}
}
