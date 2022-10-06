import { Routes } from '@angular/router';
import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { ListingViewElkComponent } from './listing-view-elk.component';
import { AppGuard } from '@core/guards/app.guard';
import { ListingViewComponent } from '../listing-view/listing-view.component';

//************  Product Listing pages routings  */
export const listingViewElkRoutes: Routes = [
  //pathes for different languages
  // **Designer routings - Same path for all languages **
  ...APP_CONSTANTS.PLP_PATHES.DESIGNER_ELK_EN.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DESIGNER,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),

  // **New-Arrivals routings**
  // English US and UK
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_ELK_EN.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **New-Arrivals routings**
  // German - DE
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_ELK_DE.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.GERMAN,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **New-Arrivals routings**
  // Italian - IT
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_ELK_IT.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.ITALIAN,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),

  // **New-Arrivals routings**
  // Danish - DK
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_ELK_DK.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.DANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),

  // **New-Arrivals routings**
  // Swedish - se
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_ELK_SE.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.SWEDISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **New-Arrivals routings**
  // Spanish - es
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_ELK_ES.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.SPANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **New-Arrivals routings**
  // French - fr
  ...APP_CONSTANTS.PLP_PATHES.NEW_ARRIVALS_ELK_FR.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.NEW_ARRIVALS,
      language: APP_CONSTANTS.LANGUAGES.FRENCH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  //----------------- Discover ----
  // **Discover routings**
  // English US UK, and fr - French
  ...APP_CONSTANTS.PLP_PATHES.DISCOVER_ELK_EN.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DISCOVER,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Discover routings**
  // Swedish - se
  ...APP_CONSTANTS.PLP_PATHES.DISCOVER_ELK_SE.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DISCOVER,
      language: APP_CONSTANTS.LANGUAGES.SWEDISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Discover routings**
  // Danish - dk
  ...APP_CONSTANTS.PLP_PATHES.DISCOVER_ELK_DK.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DISCOVER,
      language: APP_CONSTANTS.LANGUAGES.DANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),

  // **Discover routings**
  // Italian - it
  ...APP_CONSTANTS.PLP_PATHES.DISCOVER_ELK_IT.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DISCOVER,
      language: APP_CONSTANTS.LANGUAGES.ITALIAN,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Discover routings**
  // Spanish  - es
  ...APP_CONSTANTS.PLP_PATHES.DISCOVER_ELK_ES.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DISCOVER,
      language: APP_CONSTANTS.LANGUAGES.SPANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Discover routings**
  // German - DE
  ...APP_CONSTANTS.PLP_PATHES.DISCOVER_ELK_DE.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.DISCOVER,
      language: APP_CONSTANTS.LANGUAGES.GERMAN,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // -------------------------------------------
  {
    path: 'elk/searchItems/:search_query',
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SEARCH_ITEMS,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  },
  // -------------------------------------------
  // **Category routings => shop/:category**
  {
    path: 'elk/shop/:parent_category_seo_url/:child_category_seo_url',
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SHOP,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  },
  {
    path: 'elk/shop/:parent_category_seo_url',
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SHOP,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  },
  {
    path: 'elk/shop',
    component: ListingViewElkComponent,
    data: {
      plpFor: 'deafult-allproducts',
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  },
  //---------------- sale -------------------
  // **Sale routings**
  // English US UK, and de - German
  ...APP_CONSTANTS.PLP_PATHES.SALE_ELK_EN.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SALE,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Sale routings**
  // Swedish - se
  ...APP_CONSTANTS.PLP_PATHES.SALE_ELK_SE.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SALE,
      language: APP_CONSTANTS.LANGUAGES.SWEDISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Sale routings**
  // Danish - dk
  ...APP_CONSTANTS.PLP_PATHES.SALE_ELK_DK.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SALE,
      language: APP_CONSTANTS.LANGUAGES.DANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Sale routings**
  // Italian - it
  ...APP_CONSTANTS.PLP_PATHES.SALE_ELK_IT.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SALE,
      language: APP_CONSTANTS.LANGUAGES.ITALIAN,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Sale routings**
  // Spanish  - es
  ...APP_CONSTANTS.PLP_PATHES.SALE_ELK_ES.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SALE,
      language: APP_CONSTANTS.LANGUAGES.SPANISH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Sale routings**
  // French - fr
  ...APP_CONSTANTS.PLP_PATHES.SALE_ELK_FR.map(path => ({
    path,
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.SALE,
      language: APP_CONSTANTS.LANGUAGES.FRENCH,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  })),
  // **Child category routings =>/:category/:childCategory**
  {
    path: 'elk/:parent_category_seo_url/:child_category_seo_url',
    component: ListingViewElkComponent,
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
    path: 'elk/:styles_seo_url',
    component: ListingViewElkComponent,
    data: {
      plpFor: APP_CONSTANTS.PLP_ROUTES.STYLE_MOTHERPAGE,
      language: APP_CONSTANTS.LANGUAGES.ENGLISH_US,
      reuseComponent: false,
    },
    canActivate: [AppGuard],
  },
];
