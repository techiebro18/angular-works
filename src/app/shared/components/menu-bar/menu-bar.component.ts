import { MenuOption } from 'src/app/modules/default/static/help-and-support/help-and-support.component';
import { Router } from '@angular/router';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tvb-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  @Input() menuOptions: MenuOption[] = [];
  @Input() activeMenuOption: MenuOption = undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleClickMenuOption(menuOption: MenuOption): void {
    this.router.navigate([menuOption.routePath]);
  }
}
