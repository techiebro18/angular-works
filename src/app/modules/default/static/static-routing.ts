import { Routes } from '@angular/router';
import { CareersComponent } from './careers/careers.component';
import { AppGuard } from '@core/guards/app.guard';

export const staticRoutes: Routes = [
  {
    path: 'careers',
    component: CareersComponent,
    data: {
      title: 'Careers',
      subTitle: '',
    },
    canActivate: [AppGuard],
  },
  {
    path: 'karriere',
    component: CareersComponent,
    data: {
      title: 'Careers',
      subTitle: '',
    },
    canActivate: [AppGuard],
  },
  {
    path: 'karriärer',
    component: CareersComponent,
    data: {
      title: 'Careers',
      subTitle: '',
    },
    canActivate: [AppGuard],
  },
  {
    path: 'recrutement',
    component: CareersComponent,
    data: {
      title: 'Careers',
      subTitle: '',
    },
    canActivate: [AppGuard],
  },
  {
    path: 'trabaja-con-nosotros',
    component: CareersComponent,
    data: {
      title: 'Careers',
      subTitle: '',
    },
    canActivate: [AppGuard],
  },
  {
    path: 'lavora-con-noi',
    component: CareersComponent,
    data: {
      title: 'Careers',
      subTitle: '',
    },
    canActivate: [AppGuard],
  },
];
