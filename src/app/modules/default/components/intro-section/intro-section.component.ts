import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-intro-section',
  templateUrl: './intro-section.component.html',
  styleUrls: ['./intro-section.component.scss'],
})
export class IntroSectionComponent implements OnInit {
  @Input() sectionInfo: any;
  public section_1: any;
  public section_2: any;
  public env = environment;

  constructor() {}

  ngOnInit(): void {
    this.section_1 = this.sectionInfo[0];
    this.section_2 = this.sectionInfo[1];
  }
}
