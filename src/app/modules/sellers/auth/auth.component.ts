import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  forgotEvent = false;
  constructor() {}

  ngOnInit(): void {}

  public forgotPassEvent(event): void {
    console.log(event);
    this.forgotEvent = event;
  }
}
