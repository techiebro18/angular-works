import { Routes } from '@angular/router';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { ListingViewComponent } from './listing-view.component';
import { AppGuard } from '@core/guards/app.guard';

//************  Product Listing pages routings  */
export const listingViewRoutes: Routes = [
  //pathes for different languages

  // **Designer routings - Same path for all languages **
  ...APP_CONSTANTS.PLP_PATHES.DESIGNER_EN.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DESIGNER,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),

  // **New-Arrivals routings**
  // English US and UK
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_EN.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),

  // **New-Arrivals routings**
  // German - DE
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_DE.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.GERMAN,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **New-Arrivals routings**
  // Italian - IT
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_IT.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.ITALIAN,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),

  // **New-Arrivals routings**
  // Danish - DK
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_DK.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.DANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),

  // **New-Arrivals routings**
  // Swedish - se
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_SE.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.SWEDISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **New-Arrivals routings**
  // Spanish - es
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_ES.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.SPANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **New-Arrivals routings**
  // French - fr
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_FR.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.FRENCH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),

  // **most-wanted routings**
  // English US and UK
  ...APP_CONSTANTS.PLP_PATHES.MOST_WANTED_EN.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.MOST_WANTED,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **most-wanted routings**
  // German - DE
  ...APP_CONSTANTS.PLP_PATHES.MOST_WANTED_DE.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.MOST_WANTED,
      language: APP_CONSTANTS.LANGUAGES.GERMAN,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **most-wanted routings**
  // Swedish - se
  ...APP_CONSTANTS.PLP_PATHES.MOST_WANTED_SE.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.MOST_WANTED,
      language: APP_CONSTANTS.LANGUAGES.SWEDISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **most-wanted routings**
  // Danish - dk
  ...APP_CONSTANTS.PLP_PATHES.MOST_WANTED_DK.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.MOST_WANTED,
      language: APP_CONSTANTS.LANGUAGES.DANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),

  // **most-wanted routings**
  // French - fr
  ...APP_CONSTANTS.PLP_PATHES.MOST_WANTED_FR.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.MOST_WANTED,
      language: APP_CONSTANTS.LANGUAGES.FRENCH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **most-wanted routings**
  // Spanish -es
  ...APP_CONSTANTS.PLP_PATHES.MOST_WANTED_ES.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.MOST_WANTED,
      language: APP_CONSTANTS.LANGUAGES.SPANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **most-wanted routings**
  // Italian - it
  ...APP_CONSTANTS.PLP_PATHES.MOST_WANTED_IT.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.MOST_WANTED,
      language: APP_CONSTANTS.LANGUAGES.ITALIAN,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Sale routings**
  // English US UK, and de - German
  ...APP_CONSTANTS.PLP_PATHES.SALE_EN.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SALE,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Sale routings**
  // Swedish - se
  ...APP_CONSTANTS.PLP_PATHES.SALE_SE.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SALE,
      language: APP_CONSTANTS.LANGUAGES.SWEDISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Sale routings**
  // Danish - dk
  ...APP_CONSTANTS.PLP_PATHES.SALE_DK.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SALE,
      language: APP_CONSTANTS.LANGUAGES.DANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Sale routings**
  // Italian - it
  ...APP_CONSTANTS.PLP_PATHES.SALE_IT.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SALE,
      language: APP_CONSTANTS.LANGUAGES.ITALIAN,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Sale routings**
  // Spanish  - es
  ...APP_CONSTANTS.PLP_PATHES.SALE_ES.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SALE,
      language: APP_CONSTANTS.LANGUAGES.SPANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Sale routings**
  // French - fr
  ...APP_CONSTANTS.PLP_PATHES.SALE_FR.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SALE,
      language: APP_CONSTANTS.LANGUAGES.FRENCH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  //----------------- Discover ----
  // **Discover routings**
  // English US UK, and fr - French
  ...APP_CONSTANTS.PLP_PATHES.DISCOVER_EN.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DISCOVER,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Discover routings**
  // Swedish - se
  ...APP_CONSTANTS.PLP_PATHES.DISCOVER_SE.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DISCOVER,
      language: APP_CONSTANTS.LANGUAGES.SWEDISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Discover routings**
  // Danish - dk
  ...APP_CONSTANTS.PLP_PATHES.DISCOVER_DK.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DISCOVER,
      language: APP_CONSTANTS.LANGUAGES.DANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),

  // **Discover routings**
  // Italian - it
  ...APP_CONSTANTS.PLP_PATHES.DISCOVER_IT.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DISCOVER,
      language: APP_CONSTANTS.LANGUAGES.ITALIAN,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Discover routings**
  // Spanish  - es
  ...APP_CONSTANTS.PLP_PATHES.DISCOVER_ES.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DISCOVER,
      language: APP_CONSTANTS.LANGUAGES.SPANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Discover routings**
  // German - DE
  ...APP_CONSTANTS.PLP_PATHES.DISCOVER_DE.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DISCOVER,
      language: APP_CONSTANTS.LANGUAGES.GERMAN,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // -------------------------------------------
  // **Category routings => shop/:category**
  {
    path: 'shop/:parent_category_seo_url/:child_category_seo_url',
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SHOP,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  },
  // **Category routings => shop/:category**
  {
    path: 'shop/:parent_category_seo_url',
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SHOP,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  },
  {
    path: 'shop',
    component: ListingViewComponent,
    data: {
      plpFor: 'deafult-allproducts',
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  },
  {
    path: 'searchItems/:search_query',
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SEARCH_ITEMS,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  },
  // -------------------------------------------
  // **Community routings => community/members/:seller_seo_url**
  // same for all languages
  ...APP_CONSTANTS.PLP_PATHES.COMMUNITY_EN.map(path => ({
    path,
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.COMMUNITY,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),

  // **Child category routings =>/:category/:childCategory**
  {
    path: ':parent_category_seo_url/:child_category_seo_url',
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.CHILD_CATEGORY,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  },
  // **Motherpage (style):  routings =>/:styles_seo_url_en**
  // This route is also the route for Product details page,
  // the query param ?pdp=productId will be used to decide if this is a PLP or PDP
  {
    path: ':styles_seo_url',
    component: ListingViewComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.STYLE_MOTHERPAGE,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  },
];
