import { APP_CONSTANTS } from '@shared/constants/app-constants';
import { FilterConfig, PLPConfiguration } from './plp-definitions';

/**
 * All available filters names
 */
export enum FilterNames {
  Categories = 'categories',
  Designers = 'designers',
  Styles = 'styles',
  Colors = 'colors',
  Conditions = 'condition',
  BudgetAndPrice = 'budgetAndPrice',
  ShoesSize = 'shoesSize',
  ClothingSize = 'clothingSize',
  Discount = 'discount',
  Material = 'material',
}

/**
 * All Available filters config based on language, and currency
 * @param language
 * @param currency
 * @returns
 */
export const basePlpConfig = (language: string, currency: string) => {
  const parentCategoryKey = `parent_category_${language}.url`;
  const parentCategoryName = `parent_category_${language}.url`;
  const childCategoryKey = `category_${language}.url`;
  const brandsNameKey = `brands_name_${language}`;
  const colorKey = `color_${language}`;
  const priceKey = `discounted_price_${currency}`;
  const conditionsKey = 'condition_rating';
  const shoesSizeKey = 'shoes_size';
  const clothingSizeKey = 'clothing_size';
  const stylesKey = `styles_seo_url_${language}`;
  const discountKey = 'discount_percentage';
  const brandsSeoUrlKey = `brands_seo_url_${language}`;
  const discoverSeoUrlKey = `discover_${language}`;

  return {
    //Keys
    parentCategoryKey: parentCategoryKey,
    childCategoryKey: childCategoryKey,
    brandsNameKey: brandsNameKey,
    colorKey: colorKey,
    priceKey: priceKey,
    conditionsKey: conditionsKey,
    shoesSizeKey: shoesSizeKey,
    clothingSizeKey: clothingSizeKey,
    stylesKey: stylesKey,
    discountKey: discountKey,
    brandsSeoUrlKey: brandsSeoUrlKey,
    discoverSeoUrlKey: discoverSeoUrlKey,
    // filter config
    [FilterNames.Categories]: {
      name: FilterNames.Categories,
      label: 'Categories',
      attribute: parentCategoryKey,
      value: parentCategoryName,
      childLabel: 'Sub Categories',
      childAttribute: childCategoryKey,
      columnsNum: 1,
    } as FilterConfig,
    [FilterNames.Designers]: {
      name: FilterNames.Designers,
      label: 'Designers',
      attribute: brandsNameKey,
      columnsNum: 1,
    } as FilterConfig,
    [FilterNames.Styles]: {
      name: FilterNames.Styles,
      label: 'Styles',
      attribute: stylesKey,
      columnsNum: 1,
    } as FilterConfig,
    [FilterNames.Colors]: {
      name: FilterNames.Colors,
      label: 'Colors',
      attribute: colorKey,
      columnsNum: 1,
    } as FilterConfig,
    [FilterNames.Conditions]: {
      name: FilterNames.Conditions,
      label: 'Condition',
      attribute: conditionsKey,
      items: [
        { start: 1, end: 1, label: 'New with tags' },
        { start: 2, end: 2, label: 'Excellent' },
        { start: 4, end: 4, label: 'Good, but used' },
        { start: 5, end: 5, label: 'Worn with love' },
      ],
      columnsNum: 1,
    } as FilterConfig,
    [FilterNames.BudgetAndPrice]: {
      name: FilterNames.BudgetAndPrice,
      label: 'For Your Budget',
      attribute: priceKey,
      items: [
        { end: 50, label: 'Under 50$' },
        { start: 50, end: 300, label: '50$ - 300$' },
        { start: 300, end: 500, label: '300$ - 500$' },
        { start: 500, end: 1000, label: '500$ - 1000$' },
        { start: 1000, label: 'Over 1000$' },
      ],
    } as FilterConfig,
    [FilterNames.Discount]: {
      name: FilterNames.Discount,
      label: 'Discount',
      attribute: discountKey,
      items: [
        { start: 10, label: '10% off or more' },
        { start: 20, label: '20% off or more' },
        { start: 30, label: '30% off or more' },
        { start: 40, label: '40% off or more' },
        { start: 50, label: '50% off or more' },
      ],
    } as FilterConfig,
    [FilterNames.ShoesSize]: {
      name: FilterNames.ShoesSize,
      label: 'Shoes Sizes (EU)',
      attribute: shoesSizeKey,
      columnsNum: 2,
    } as FilterConfig,
    [FilterNames.ClothingSize]: {
      name: FilterNames.ClothingSize,
      label: 'Clothing Sizes (FR)',
      attribute: clothingSizeKey,
      columnsNum: 2,
    } as FilterConfig,
    [FilterNames.Material]: {
      name: FilterNames.Material,
    } as FilterConfig,
  };
};

export function defaultPLPConfiguration(
  language: string,
  currency: string,
  currencySymbol: string,
  parent_category_seo_url,
  child_category_seo_url
): PLPConfiguration {
  const plpConfig = basePlpConfig(language, currency);
  const disjunctiveFacetsRefinements = {};

  if (parent_category_seo_url) {
    // set default selection for parantCategory
    disjunctiveFacetsRefinements[plpConfig.parentCategoryKey] = [parent_category_seo_url];
  }

  if (child_category_seo_url) {
    // set default selection for pchildCategory
    disjunctiveFacetsRefinements[plpConfig.childCategoryKey] = [child_category_seo_url];
  }

  return {
    language: language,
    currency: currency,
    currencySymbol: currencySymbol,
    parentCategoryValue: parent_category_seo_url,
    searchParameters: {
      query: '',
      hitsPerPage: 60,
      clickAnalytics: true,
      enablePersonalization: true,
      disjunctiveFacetsRefinements: disjunctiveFacetsRefinements,
    },
    filtersStructure: [
      plpConfig[FilterNames.Categories],
      plpConfig[FilterNames.Designers],
      plpConfig[FilterNames.Styles],
      plpConfig[FilterNames.Colors],
      //TODO: conditions does not exissts on Algolia index
      plpConfig[FilterNames.Conditions],
      plpConfig[FilterNames.BudgetAndPrice],
      plpConfig[FilterNames.Discount],
      plpConfig[FilterNames.ShoesSize],
      plpConfig[FilterNames.ClothingSize],
      //TODO: Material does not exissts on Algolia index
      // plpConfig[FilterNames.Material]
    ],
  };
}

export function stylesPLPConfiguration(
  language: string,
  currency: string,
  currencySymbol: string,
  styles_seo_url: string
): PLPConfiguration {
  const plpConfig = basePlpConfig(language, currency);

  return {
    language: language,
    currency: currency,
    currencySymbol: currencySymbol,
    parentCategoryValue: null,
    searchParameters: {
      query: '',
      hitsPerPage: 60,
      clickAnalytics: true,
      enablePersonalization: true,
      filters: `${plpConfig.stylesKey}: ${styles_seo_url}`,
    },
    filtersStructure: [
      plpConfig[FilterNames.Colors],
      //TODO: Material does not exissts on Algolia index
      // plpConfig[FilterNames.Material],
      plpConfig[FilterNames.BudgetAndPrice],
      plpConfig[FilterNames.Conditions],
      plpConfig[FilterNames.Discount],
      plpConfig[FilterNames.ShoesSize],
      plpConfig[FilterNames.ClothingSize],
    ],
  };
}

export function salePLPConfiguration(
  language: string,
  currency: string,
  currencySymbol: string,
  parent_category_seo_url,
  child_category_seo_url
): PLPConfiguration {
  const plpConfig = basePlpConfig(language, currency);
  const disjunctiveFacetsRefinements = {};

  if (parent_category_seo_url) {
    // set default selection for parantCategory
    disjunctiveFacetsRefinements[plpConfig.parentCategoryKey] = [parent_category_seo_url];
  }

  if (child_category_seo_url) {
    // set default selection for pchildCategory
    disjunctiveFacetsRefinements[plpConfig.childCategoryKey] = [child_category_seo_url];
  }

  return {
    language: language,
    currency: currency,
    currencySymbol: currencySymbol,
    parentCategoryValue: parent_category_seo_url,
    searchParameters: {
      query: '',
      hitsPerPage: 60,
      clickAnalytics: true,
      enablePersonalization: true,
      filters: 'is_discount = 1 AND discount_percentage >= 5',
      disjunctiveFacetsRefinements: disjunctiveFacetsRefinements,
    },
    filtersStructure: [
      plpConfig[FilterNames.Categories],
      plpConfig[FilterNames.Designers],
      plpConfig[FilterNames.Styles],
      plpConfig[FilterNames.Colors],
      plpConfig[FilterNames.Conditions],
      plpConfig[FilterNames.BudgetAndPrice],
      plpConfig[FilterNames.Discount],
      plpConfig[FilterNames.ShoesSize],
      plpConfig[FilterNames.ClothingSize],
      //TODO: Material does not exissts on Algolia index
      // plpConfig[FilterNames.Material]
    ],
  };
}
export function mostWantedPLPConfiguration(
  language: string,
  currency: string,
  currencySymbol: string,
  parent_category_seo_url,
  child_category_seo_url
): PLPConfiguration {
  const plpConfig = basePlpConfig(language, currency);
  const disjunctiveFacetsRefinements = {};

  if (parent_category_seo_url) {
    // set default selection for parantCategory
    disjunctiveFacetsRefinements[plpConfig.parentCategoryKey] = [parent_category_seo_url];
  }

  if (child_category_seo_url) {
    // set default selection for pchildCategory
    disjunctiveFacetsRefinements[plpConfig.childCategoryKey] = [child_category_seo_url];
  }

  return {
    language: language,
    currency: currency,
    currencySymbol: currencySymbol,
    parentCategoryValue: parent_category_seo_url,
    searchParameters: {
      query: '',
      hitsPerPage: 60,
      clickAnalytics: true,
      enablePersonalization: true,
      filters: 'total_wishlisted > 0',
      disjunctiveFacetsRefinements: disjunctiveFacetsRefinements,
    },
    filtersStructure: [
      plpConfig[FilterNames.Categories],
      plpConfig[FilterNames.Designers],
      plpConfig[FilterNames.Styles],
      plpConfig[FilterNames.Colors],
      plpConfig[FilterNames.Conditions],
      plpConfig[FilterNames.BudgetAndPrice],
      plpConfig[FilterNames.Discount],
      plpConfig[FilterNames.ShoesSize],
      plpConfig[FilterNames.ClothingSize],
      //TODO: Material does not exissts on Algolia index
      // plpConfig[FilterNames.Material]
    ],
  };
}
export function childCategoryPLPConfiguration(
  language: string,
  currency: string,
  currencySymbol: string,
  parent_category_seo_url,
  child_category_seo_url
): PLPConfiguration {
  const plpConfig = basePlpConfig(language, currency);
  const disjunctiveFacetsRefinements = {};

  if (parent_category_seo_url) {
    // set default selection for parantCategory
    disjunctiveFacetsRefinements[plpConfig.parentCategoryKey] = [parent_category_seo_url];
  }

  if (child_category_seo_url) {
    // set default selection for pchildCategory
    // disjunctiveFacetsRefinements[plpConfig.childCategoryKey] = [child_category_seo_url];
  }

  const designerChildCategoryKey = `hidden_category_${language}`;

  return {
    language: language,
    currency: currency,
    currencySymbol: currencySymbol,
    parentCategoryValue: parent_category_seo_url,
    childCategoryValue: child_category_seo_url,
    autoSelectChildCategory: true,
    searchParameters: {
      query: '',
      hitsPerPage: 60,
      clickAnalytics: true,
      enablePersonalization: true,
      // TODO: childs that are designer (for bags and jewelry in all languages  ) should be hard coded and added as
      // disjunctiveFacetsRefinements with hidden_category_en
      filters: `${plpConfig.parentCategoryKey}: ${parent_category_seo_url} AND (${designerChildCategoryKey}:${child_category_seo_url} OR ${plpConfig.childCategoryKey}:${child_category_seo_url} )`,
      disjunctiveFacetsRefinements: disjunctiveFacetsRefinements,
    },
    filtersStructure: [
      {
        ...plpConfig[FilterNames.Categories],
        isShowCategories: false,
      },
      plpConfig[FilterNames.Designers],
      plpConfig[FilterNames.Styles],
      plpConfig[FilterNames.Colors],
      plpConfig[FilterNames.Conditions],
      plpConfig[FilterNames.BudgetAndPrice],
      plpConfig[FilterNames.Discount],
      plpConfig[FilterNames.ShoesSize],
      plpConfig[FilterNames.ClothingSize],
      //TODO: Material does not exissts on Algolia index
      // plpConfig[FilterNames.Material]
    ],
  };
}
export function categoryPLPConfiguration(
  language: string,
  currency: string,
  currencySymbol: string,
  parent_category_seo_url,
  child_category_seo_url
): PLPConfiguration {
  const plpConfig = basePlpConfig(language, currency);

  const disjunctiveFacetsRefinements = {};

  if (parent_category_seo_url) {
    // set default selection for parantCategory
    disjunctiveFacetsRefinements[plpConfig.parentCategoryKey] = [parent_category_seo_url];
  }

  if (child_category_seo_url) {
    // set default selection for pchildCategory
    // disjunctiveFacetsRefinements[plpConfig.childCategoryKey] = [child_category_seo_url];
    disjunctiveFacetsRefinements[plpConfig.childCategoryKey] = [child_category_seo_url];
  }

  return {
    language: language,
    currency: currency,
    currencySymbol: currencySymbol,
    parentCategoryValue: parent_category_seo_url,
    childCategoryValue: child_category_seo_url,
    searchParameters: {
      query: '',
      hitsPerPage: 60,
      clickAnalytics: true,
      enablePersonalization: true,
      disjunctiveFacetsRefinements: disjunctiveFacetsRefinements,
    },
    filtersStructure: [
      plpConfig[FilterNames.Categories],
      plpConfig[FilterNames.Designers],
      plpConfig[FilterNames.Styles],
      plpConfig[FilterNames.Colors],
      plpConfig[FilterNames.Conditions],
      plpConfig[FilterNames.BudgetAndPrice],
      plpConfig[FilterNames.Discount],
      plpConfig[FilterNames.ShoesSize],
      plpConfig[FilterNames.ClothingSize],
      //TODO: Material does not exissts on Algolia index
      // plpConfig[FilterNames.Material]
    ],
  };
}
export function newArrivalsPLPConfiguration(
  language: string,
  currency: string,
  currencySymbol: string,
  parent_category_seo_url,
  child_category_seo_url
): PLPConfiguration {
  const plpConfig = basePlpConfig(language, currency);
  //Two Weeks ago Unix timestamp
  const ourDate = new Date();
  //Change it so that it is 14 days in the past.
  const pastDate = ourDate.getDate() - 14;

  ourDate.setDate(pastDate);
  //unix timestamp in seconds
  const twoWeeksAgoUnixtimestamp = Math.floor(ourDate.getTime() / 1000);

  const disjunctiveFacetsRefinements = {};

  if (parent_category_seo_url) {
    // set default selection for parantCategory
    disjunctiveFacetsRefinements[plpConfig.parentCategoryKey] = [parent_category_seo_url];
  }

  if (child_category_seo_url) {
    // set default selection for pchildCategory
    disjunctiveFacetsRefinements[plpConfig.childCategoryKey] = [child_category_seo_url];
  }

  return {
    language: language,
    currency: currency,
    currencySymbol: currencySymbol,
    parentCategoryValue: parent_category_seo_url,
    searchParameters: {
      query: '',
      hitsPerPage: 60,
      clickAnalytics: true,
      enablePersonalization: true,
      filters: `approved_at > ${twoWeeksAgoUnixtimestamp}`,
      disjunctiveFacetsRefinements: disjunctiveFacetsRefinements,
    },
    filtersStructure: [
      plpConfig[FilterNames.Categories],
      plpConfig[FilterNames.Designers],
      plpConfig[FilterNames.Styles],
      plpConfig[FilterNames.Colors],
      plpConfig[FilterNames.BudgetAndPrice],
      plpConfig[FilterNames.Conditions],
      plpConfig[FilterNames.Discount],
      plpConfig[FilterNames.ShoesSize],
      plpConfig[FilterNames.ClothingSize],
      //TODO: Material does not exissts on Algolia index
      // plpConfig[FilterNames.Material]
    ],
  };
}
export function communityPLPConfiguration(
  language: string,
  currency: string,
  currencySymbol: string,
  seller_seo_url,
  parent_category_seo_url,
  child_category_seo_url
): PLPConfiguration {
  const plpConfig = basePlpConfig(language, currency);

  const disjunctiveFacetsRefinements = {};
  //set community filter
  let filter = '';

  if (seller_seo_url && seller_seo_url != 'the-vintage-bar') filter = `commission_user_id: ${seller_seo_url}`;
  else filter = 'commission: "no"';

  if (parent_category_seo_url) {
    // set default selection for parantCategory
    disjunctiveFacetsRefinements[plpConfig.parentCategoryKey] = [parent_category_seo_url];
  }

  if (child_category_seo_url) {
    // set default selection for pchildCategory
    disjunctiveFacetsRefinements[plpConfig.childCategoryKey] = [child_category_seo_url];
  }

  return {
    language: language,
    currency: currency,
    currencySymbol: currencySymbol,
    parentCategoryValue: parent_category_seo_url,
    searchParameters: {
      query: '',
      hitsPerPage: 60,
      clickAnalytics: true,
      enablePersonalization: true,
      filters: filter,
      disjunctiveFacetsRefinements: disjunctiveFacetsRefinements,
    },
    filtersStructure: [
      plpConfig[FilterNames.Categories],
      plpConfig[FilterNames.Designers],
      plpConfig[FilterNames.Styles],
      plpConfig[FilterNames.Colors],
      plpConfig[FilterNames.Conditions],
      plpConfig[FilterNames.BudgetAndPrice],
      plpConfig[FilterNames.Discount],
      plpConfig[FilterNames.ShoesSize],
      plpConfig[FilterNames.ClothingSize],
      //TODO: Material does not exissts on Algolia index
      // plpConfig[FilterNames.Material]
    ],
  };
}
export function discoverPLPConfiguration(
  language: string,
  currency: string,
  currencySymbol: string,
  discover_seo_url,
  parent_category_seo_url,
  child_category_seo_url
): PLPConfiguration {
  const plpConfig = basePlpConfig(language, currency);
  const disjunctiveFacetsRefinements = {};

  //set Designer filter
  // using seo is okay since designers list facets will not be visible
  disjunctiveFacetsRefinements[plpConfig.discoverSeoUrlKey] = [discover_seo_url];

  if (parent_category_seo_url) {
    // set default selection for parantCategory
    disjunctiveFacetsRefinements[plpConfig.parentCategoryKey] = [parent_category_seo_url];
  }

  if (child_category_seo_url) {
    // set default selection for pchildCategory
    disjunctiveFacetsRefinements[plpConfig.childCategoryKey] = [child_category_seo_url];
  }

  return {
    language: language,
    currency: currency,
    currencySymbol: currencySymbol,
    parentCategoryValue: parent_category_seo_url,
    searchParameters: {
      query: '',
      hitsPerPage: 60,
      clickAnalytics: true,
      enablePersonalization: true,
      disjunctiveFacetsRefinements: disjunctiveFacetsRefinements,
    },
    filtersStructure: [
      plpConfig[FilterNames.Categories],
      plpConfig[FilterNames.Designers],
      plpConfig[FilterNames.Styles],
      plpConfig[FilterNames.Colors],
      plpConfig[FilterNames.Conditions],
      plpConfig[FilterNames.BudgetAndPrice],
      plpConfig[FilterNames.Discount],
      plpConfig[FilterNames.ShoesSize],
      plpConfig[FilterNames.ClothingSize],
      //TODO: Material does not exissts on Algolia index
      // plpConfig[FilterNames.Material]
    ],
  };
}
export function designerPLPConfiguration(
  language: string,
  currency: string,
  currencySymbol: string,
  designer_seo_url,
  parent_category_seo_url,
  child_category_seo_url
): PLPConfiguration {
  const plpConfig = basePlpConfig(language, currency);
  const disjunctiveFacetsRefinements = {};

  //set Designer filter
  // using seo is okay since designers list facets will not be visible
  disjunctiveFacetsRefinements[plpConfig.brandsSeoUrlKey] = [designer_seo_url];

  if (parent_category_seo_url) {
    // set default selection for parantCategory
    disjunctiveFacetsRefinements[plpConfig.parentCategoryKey] = [parent_category_seo_url];
  }

  if (child_category_seo_url) {
    // set default selection for pchildCategory
    disjunctiveFacetsRefinements[plpConfig.childCategoryKey] = [child_category_seo_url];
  }

  return {
    language: language,
    currency: currency,
    currencySymbol: currencySymbol,
    parentCategoryValue: parent_category_seo_url,
    searchParameters: {
      query: '',
      hitsPerPage: 60,
      clickAnalytics: true,
      enablePersonalization: true,
      disjunctiveFacetsRefinements: disjunctiveFacetsRefinements,
    },
    filtersStructure: [
      plpConfig[FilterNames.Categories],
      plpConfig[FilterNames.Styles],
      plpConfig[FilterNames.Colors],
      plpConfig[FilterNames.Conditions],
      plpConfig[FilterNames.BudgetAndPrice],
      plpConfig[FilterNames.Discount],
      plpConfig[FilterNames.ShoesSize],
      plpConfig[FilterNames.ClothingSize],
      //TODO: Material does not exissts on Algolia index
      // plpConfig[FilterNames.Material]
    ],
  };
}
export function searchItemsPLPConfiguration(
  language: string,
  currency: string,
  currencySymbol: string,
  search_query
): PLPConfiguration {
  const plpConfig = basePlpConfig(language, currency);
  const disjunctiveFacetsRefinements = {};
  //set Designer filter
  // using seo is okay since designers list facets will not be visible

  return {
    language: language,
    currency: currency,
    currencySymbol: currencySymbol,
    parentCategoryValue: null,
    searchParameters: {
      query: search_query,
      hitsPerPage: 60,
      clickAnalytics: true,
      enablePersonalization: true,
      disjunctiveFacetsRefinements: disjunctiveFacetsRefinements,
    },
    filtersStructure: [
      plpConfig[FilterNames.Categories],
      plpConfig[FilterNames.Designers],
      plpConfig[FilterNames.Styles],
      plpConfig[FilterNames.Colors],
      plpConfig[FilterNames.Conditions],
      plpConfig[FilterNames.BudgetAndPrice],
      plpConfig[FilterNames.Discount],
      plpConfig[FilterNames.ShoesSize],
      plpConfig[FilterNames.ClothingSize],
      //TODO: Material does not exissts on Algolia index
      // plpConfig[FilterNames.Material]
    ],
  };
}

// Returns a slug from the category name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
export function getCategorySlug(name) {
  return name.split(' ').map(encodeURIComponent).join('+');
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
export function getCategoryName(slug) {
  return slug.split('+').map(decodeURIComponent).join(' ');
}

export function getPathFromURL(url) {
  // url could be /designer/bottega-veneta/bags
  // or a/designer/bottega-veneta/bags
  // should return /designer or /a/designer
  // in all languages
  let returnedPath = '';

  if (url.startsWith('/')) {
    url = url.substring(1);
  }

  const urlParts = url.split('/');
  // console.log(urlParts);
  let pathIndex = 0;

  if (urlParts.length > pathIndex) {
    //
    if (urlParts[pathIndex] == 'a') {
      returnedPath += '/a';
      pathIndex = 1;
    }

    if (urlParts.length > pathIndex) {
      if (APP_CONSTANTS.PLP_PATHES.ALLPATHES.includes(urlParts[pathIndex])) {
        returnedPath += '/' + urlParts[pathIndex];

        // Designer should have the designer name as well in the path
        if (urlParts[pathIndex] == 'designer') {
          // keep designer_seo_url in the path if this is a designer route
          returnedPath += '/' + urlParts[pathIndex + 1];
        }
        else if (APP_CONSTANTS.DISCOVER_LINKS.includes(urlParts[pathIndex])) {
          // keep discover_seo_url in the path if this is a discover route
          returnedPath += '/' + urlParts[pathIndex + 1];
        }
        else if (urlParts[pathIndex] == 'community') {
          // keep /members/seller_seo_url in the path if this is a community route
          returnedPath += '/members/' + urlParts[pathIndex + 2];
        }
      }
    }

    return returnedPath;
  }
  else {
    return returnedPath;
  }
}
