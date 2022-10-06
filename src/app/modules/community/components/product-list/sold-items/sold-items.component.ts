import { Component, Input, OnInit } from '@angular/core';
import { SoldItem } from '@schemas/community/sold-item';

@Component({
  selector: 'app-sold-items',
  templateUrl: './sold-items.component.html',
  styleUrls: ['./sold-items.component.scss', '../card-member/card-member.component.scss'],
})
export class SoldItemsComponent implements OnInit {
  @Input() public user_id: number;

  @Input() public soldItems: Array<SoldItem>;

  constructor() {}

  ngOnInit(): void {}
}
