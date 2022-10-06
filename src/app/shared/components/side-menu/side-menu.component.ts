import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccordionTopic } from '@shared/components/accordion/accordion.component';

interface MenuOption {
  title: string;
  iconPath: string;
  routePath: string;
  active: boolean;
  topics: AccordionTopic[];
}

@Component({
  selector: 'tvb-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Input() menuOptions: MenuOption[] = [];
  @Input() activeMenuOption: MenuOption = undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleClickMenuOption(menuOption: MenuOption) {
    this.router.navigate([menuOption.routePath]);
  }
}
