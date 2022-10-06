import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { CommunityComponent } from './community.component';
import { MembersComponent } from './pages/members/members.component';

const routes: Routes = [
  {
    path: '',
    component: CommunityComponent,
    children: [
      {
        path: 'members/:username',
        component: MembersComponent,
        data: {
          plpFor: APP_CONSTANTS.PLP_ROUTES.COMMUNITY,
          language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
          reuseComponent: false,
        },
      },
      {
        path: 'members/:username/:parent_category_seo_url/:child_category_seo_url',
        component: MembersComponent,
        data: {
          plpFor: APP_CONSTANTS.PLP_ROUTES.COMMUNITY,
          language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
          reuseComponent: false,
        },
      },
      {
        path: 'members/:username/:parent_category_seo_url',
        component: MembersComponent,
        data: {
          plpFor: APP_CONSTANTS.PLP_ROUTES.COMMUNITY,
          language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
          reuseComponent: false,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityRoutingModule {}
