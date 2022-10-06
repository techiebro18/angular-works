// App constants used all over the app
export const APP_CONSTANTS = {
  STORAGE_KEYS: {
    CART: 'cart',
    PRODUCTS: 'products',
    API_KEY: 'api_key', // used for old APIs
    ACCESS_TOKEN: 'access_token', // used for APIv2
    ACCESS_TOKEN_KEYCLOAK: 'keycloak_access_token',
    USER_ID: 'user_id',
    USER_DATA: 'user_data',
    DEVICE_ID: 'device_id',
  },
  COOKIE_KEYS: {
    CART_COUNT: 'cart_count',
    API_KEY: 'API_KEY',
    ACCESS_TOKEN_KEYCLOAK: 'keycloak_access_token',
    ACCESS_TOKEN: 'access_token', // used for APIv2
    USER_ID: 'USER_ID',
    USER_DATA: 'user_data',
    CONFIG_ID: 'CONFIG_ID',
    CLIENT_WEBSITE_TOKEN: 'CLIENT_WEBSITE_TOKEN',
    DEVICE_ID: 'device_id',
    ANONYMOUS_ID: 'anonymousId',
    CURRENCY_ID: 'currency_id',
    CURRENCY_CODE: 'currency_code',
    LANGUAGE_ID: 'language_id',
    LANGUAGE_SHORT_NAME: 'language_short_name',
    COUNTRY_ID: 'country_id',
    COUNTRY_NAME: 'country_name',
  },
  PLP_ROUTES: {
    DESIGNER: 'designer',
    NEW_ARRIVALS: 'new-in',
    MOST_WANTED: 'most-wanted',
    SALE: 'sale',
    SHOP: 'shop',
    CHILD_CATEGORY: 'child-category',
    STYLE_MOTHERPAGE: 'style-motherpage',
    SEARCH_ITEMS: 'searchItems',
    THE_ARCHIVE: 'the-archive',
    DISCOVER: 'discover',
    COMMUNITY: 'community',
  },
  LANGUAGES: {
    ENGLISH_US: 'en',
    ENGLISH_UK: 'uk',
    SWEDISH: 'se',
    DANISH: 'dk',
    GERMAN: 'de',
    FRENCH: 'fr',
    SPANISH: 'es',
    ITALIAN: 'it',
  },
  PLP_PATHES: {
    //en and uk - english
    DESIGNER_EN: [
      'designer/:designer_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'designer/:designer_seo_url/:parent_category_seo_url',
      'designer/:designer_seo_url',
    ],
    DESIGNER_ELK_EN: [
      'elk/designer/:designer_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'elk/designer/:designer_seo_url/:parent_category_seo_url',
      'elk/designer/:designer_seo_url',
    ],
    NEW_ARRIVALS_EN: [
      'new-in/:parent_category_seo_url/:child_category_seo_url',
      'new-in/:parent_category_seo_url',
      'new-in',
    ],
    NEW_ARRIVALS_ELK_EN: [
      'elk/new-in/:parent_category_seo_url/:child_category_seo_url',
      'elk/new-in/:parent_category_seo_url',
      'elk/new-in',
    ],
    MOST_WANTED_EN: [
      'most-wanted/:parent_category_seo_url/:child_category_seo_url',
      'most-wanted/:parent_category_seo_url',
      'most-wanted',
    ],
    SALE_EN: ['sale/:parent_category_seo_url/:child_category_seo_url', 'sale/:parent_category_seo_url', 'sale'],
    SALE_ELK_EN: [
      'elk/sale/:parent_category_seo_url/:child_category_seo_url',
      'elk/sale/:parent_category_seo_url',
      'elk/sale',
    ],
    THE_ARCHIVE_EN: [
      'the-archive/:parent_category_seo_url/:child_category_seo_url',
      'the-archive/:parent_category_seo_url',
      'the-archive',
    ],
    DISCOVER_EN: [
      'discover/:discover_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'discover/:discover_seo_url/:parent_category_seo_url',
      'discover/:discover_seo_url',
    ],
    DISCOVER_ELK_EN: [
      'elk/discover/:discover_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'elk/discover/:discover_seo_url/:parent_category_seo_url',
      'elk/discover/:discover_seo_url',
    ],
    COMMUNITY_EN: [
      'community/members/:username/:parent_category_seo_url/:child_category_seo_url',
      'community/members/:username/:parent_category_seo_url',
      'community/members/:username',
    ],
    // dk - Danish
    NEW_ARRIVALS_DK: [
      'nyheder/:parent_category_seo_url/:child_category_seo_url',
      'nyheder/:parent_category_seo_url',
      'nyheder',
    ],
    NEW_ARRIVALS_ELK_DK: [
      'elk/nyheder/:parent_category_seo_url/:child_category_seo_url',
      'elk/nyheder/:parent_category_seo_url',
      'elk/nyheder',
    ],
    MOST_WANTED_DK: [
      'mest-populære/:parent_category_seo_url/:child_category_seo_url',
      'mest-populære/:parent_category_seo_url',
      'mest-populære',
    ],
    SALE_DK: ['udsalg/:parent_category_seo_url/:child_category_seo_url', 'udsalg/:parent_category_seo_url', 'udsalg'],
    SALE_ELK_DK: [
      'elk/udsalg/:parent_category_seo_url/:child_category_seo_url',
      'elk/udsalg/:parent_category_seo_url',
      'elk/udsalg',
    ],
    THE_ARCHIVE_DK: [
      'arkivet/:parent_category_seo_url/:child_category_seo_url',
      'arkivet/:parent_category_seo_url',
      'arkivet',
    ],
    DISCOVER_DK: [
      'opdag/:discover_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'opdag/:discover_seo_url/:parent_category_seo_url',
      'opdag/:discover_seo_url',
    ],
    DISCOVER_ELK_DK: [
      'elk/opdag/:discover_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'elk/opdag/:discover_seo_url/:parent_category_seo_url',
      'elk/opdag/:discover_seo_url',
    ],
    // de - German
    NEW_ARRIVALS_DE: [
      'neuheiten/:parent_category_seo_url/:child_category_seo_url',
      'neuheiten/:parent_category_seo_url',
      'neuheiten',
    ],
    NEW_ARRIVALS_ELK_DE: [
      'elk/neuheiten/:parent_category_seo_url/:child_category_seo_url',
      'elk/neuheiten/:parent_category_seo_url',
      'elk/neuheiten',
    ],
    MOST_WANTED_DE: [
      'meistgesucht/:parent_category_seo_url/:child_category_seo_url',
      'meistgesucht/:parent_category_seo_url',
      'meistgesucht',
    ],
    THE_ARCHIVE_DE: [
      'das-archiv/:parent_category_seo_url/:child_category_seo_url',
      'das-archiv/:parent_category_seo_url',
      'das-archiv',
    ],
    DISCOVER_DE: [
      'entdecke/:discover_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'entdecke/:discover_seo_url/:parent_category_seo_url',
      'entdecke/:discover_seo_url',
    ],
    DISCOVER_ELK_DE: [
      'elk/entdecke/:discover_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'elk/entdecke/:discover_seo_url/:parent_category_seo_url',
      'elk/entdecke/:discover_seo_url',
    ],

    // se - Swedish
    NEW_ARRIVALS_SE: [
      'nyheter/:parent_category_seo_url/:child_category_seo_url',
      'nyheter/:parent_category_seo_url',
      'nyheter',
    ],
    NEW_ARRIVALS_ELK_SE: [
      'elk/nyheter/:parent_category_seo_url/:child_category_seo_url',
      'elk/nyheter/:parent_category_seo_url',
      'elk/nyheter',
    ],
    MOST_WANTED_SE: [
      'topplistan/:parent_category_seo_url/:child_category_seo_url',
      'topplistan/:parent_category_seo_url',
      'topplistan',
    ],
    SALE_SE: ['rea/:parent_category_seo_url/:child_category_seo_url', 'rea/:parent_category_seo_url', 'rea'],
    SALE_ELK_SE: [
      'elk/rea/:parent_category_seo_url/:child_category_seo_url',
      'elk/rea/:parent_category_seo_url',
      'elk/rea',
    ],
    THE_ARCHIVE_SE: [
      'arkivet/:parent_category_seo_url/:child_category_seo_url',
      'arkivet/:parent_category_seo_url',
      'arkivet',
    ],
    DISCOVER_SE: [
      'upptäck/:discover_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'upptäck/:discover_seo_url/:parent_category_seo_url',
      'upptäck/:discover_seo_url',
    ],
    DISCOVER_ELK_SE: [
      'elk/upptäck/:discover_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'elk/upptäck/:discover_seo_url/:parent_category_seo_url',
      'elk/upptäck/:discover_seo_url',
    ],

    // it - Italian

    NEW_ARRIVALS_IT: [
      'novita/:parent_category_seo_url/:child_category_seo_url',
      'novita/:parent_category_seo_url',
      'novita',
    ],
    NEW_ARRIVALS_ELK_IT: [
      'elk/novita/:parent_category_seo_url/:child_category_seo_url',
      'elk/novita/:parent_category_seo_url',
      'elk/novita',
    ],
    MOST_WANTED_IT: [
      'più-venduti/:parent_category_seo_url/:child_category_seo_url',
      'più-venduti/:parent_category_seo_url',
      'più-venduti',
    ],
    SALE_IT: ['sconto/:parent_category_seo_url/:child_category_seo_url', 'sconto/:parent_category_seo_url', 'sconto'],
    SALE_ELK_IT: [
      'elk/sconto/:parent_category_seo_url/:child_category_seo_url',
      'elk/sconto/:parent_category_seo_url',
      'elk/sconto',
    ],
    THE_ARCHIVE_IT: [
      'larchivio/:parent_category_seo_url/:child_category_seo_url',
      'larchivio/:parent_category_seo_url',
      'larchivio',
    ],
    DISCOVER_IT: [
      'scopri/:discover_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'scopri/:discover_seo_url/:parent_category_seo_url',
      'scopri/:discover_seo_url',
    ],
    DISCOVER_ELK_IT: [
      'elk/scopri/:discover_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'elk/scopri/:discover_seo_url/:parent_category_seo_url',
      'elk/scopri/:discover_seo_url',
    ],

    // es - Spanish

    NEW_ARRIVALS_ES: [
      'novedades/:parent_category_seo_url/:child_category_seo_url',
      'novedades/:parent_category_seo_url',
      'novedades',
    ],
    NEW_ARRIVALS_ELK_ES: [
      'elk/novedades/:parent_category_seo_url/:child_category_seo_url',
      'elk/novedades/:parent_category_seo_url',
      'elk/novedades',
    ],
    MOST_WANTED_ES: [
      'los-más-vendidos/:parent_category_seo_url/:child_category_seo_url',
      'los-más-vendidos/:parent_category_seo_url',
      'los-más-vendidos',
    ],
    SALE_ES: ['venta/:parent_category_seo_url/:child_category_seo_url', 'venta/:parent_category_seo_url', 'venta'],
    SALE_ELK_ES: [
      'elk/venta/:parent_category_seo_url/:child_category_seo_url',
      'elk/venta/:parent_category_seo_url',
      'elk/venta',
    ],
    THE_ARCHIVE_ES: [
      'el-archivo/:parent_category_seo_url/:child_category_seo_url',
      'el-archivo/:parent_category_seo_url',
      'el-archivo',
    ],
    DISCOVER_ES: [
      'descubrir/:discover_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'descubrir/:discover_seo_url/:parent_category_seo_url',
      'descubrir/:discover_seo_url',
    ],
    DISCOVER_ELK_ES: [
      'elk/descubrir/:discover_seo_url/:parent_category_seo_url/:child_category_seo_url',
      'elk/descubrir/:discover_seo_url/:parent_category_seo_url',
      'elk/descubrir/:discover_seo_url',
    ],
    // fr - French
    NEW_ARRIVALS_FR: [
      'nouveautes/:parent_category_seo_url/:child_category_seo_url',
      'nouveautes/:parent_category_seo_url',
      'nouveautes',
    ],
    NEW_ARRIVALS_ELK_FR: [
      'elk/nouveautes/:parent_category_seo_url/:child_category_seo_url',
      'elk/nouveautes/:parent_category_seo_url',
      'elk/nouveautes',
    ],
    MOST_WANTED_FR: [
      'tendances-du-moment/:parent_category_seo_url/:child_category_seo_url',
      'tendances-du-moment/:parent_category_seo_url',
      'tendances-du-moment',
    ],
    SALE_FR: [
      'promotions/:parent_category_seo_url/:child_category_seo_url',
      'promotions/:parent_category_seo_url',
      'promotions',
    ],
    SALE_ELK_FR: [
      'elk/promotions/:parent_category_seo_url/:child_category_seo_url',
      'elk/promotions/:parent_category_seo_url',
      'elk/promotions',
    ],
    THE_ARCHIVE_FR: [
      'les-archives/:parent_category_seo_url/:child_category_seo_url',
      'les-archives/:parent_category_seo_url',
      'les-archives',
    ],
    // DISCOVER_FR: ['descubrir/:discover_seo_url/:parent_category_seo_url/:child_category_seo_url', 'descubrir/:discover_seo_url/:parent_category_seo_url', 'descubrir/:discover_seo_url'],

    ALLPATHES: [
      // designer
      'designer',
      // new-arrivals
      'new-in',
      'nyheder',
      'neuheiten',
      'nyheter',
      'novita',
      'novedades',
      'nouveautes',
      // most-wanted
      'most-wanted',
      'mest-populære',
      'meistgesucht',
      'topplistan',
      'più-venduti',
      'los-más-vendidos',
      'tendances-du-moment',
      // sale
      'sale',
      'udsalg',
      'rea',
      'sconto',
      'venta',
      'promotions',
      // shop
      'shop',
      // azdesigners
      'azdesigners',
      // search items
      'searchItems',
      // the-archive
      'the-archive',
      'arkivet',
      'das-archiv',
      'arkivet',
      'larchivio',
      'el-archivo',
      'les-archives',
      // discover
      'discover',
      'opdag',
      'entdecke',
      'upptäck',
      'scopri',
      'descubrir', // missing french discover
      // community
      'community/members',
      'community',
    ],
  },

  DISCOVER_LINKS: ['discover', 'opdag', 'entdecke', 'upptäck', 'scopri', 'descubrir'],
  RESELL_FOR_FREE_AVAILABILITY_IN_HOURS: 72,
  RESELL_FOR_FREE_TVB_COMMISSION_PERCENT: 0,
  PRODUCT: {
    CONDITIONS: {
      1: 'new with tags',
      2: 'excellent',
      4: 'good but used',
      5: 'worn with love',
    },
  },

  COUNTRIES: [
    { id: 1, name: 'United States', shortName: 'en' },
    { id: 13, name: 'Australia' },
    { id: 14, name: 'Austria' },
    { id: 21, name: 'Belgium' },
    { id: 38, name: 'Canada' },
    { id: 58, name: 'Denmark', shortName: 'dk' },
    { id: 74, name: 'Finland' },
    { id: 75, name: 'France', shortName: 'fr' },
    { id: 82, name: 'Germany', shortName: 'de' },
    { id: 100, name: 'Iceland' },
    { id: 107, name: 'Italy', shortName: 'it' },
    { id: 155, name: 'The Netherlands' },
    { id: 164, name: 'Norway' },
    { id: 205, name: 'Spain', shortName: 'es' },
    { id: 211, name: 'Sweden', shortName: 'se' },
    { id: 212, name: 'Switzerland' },
    { id: 230, name: 'United Kingdom', shortName: 'uk' },
  ],
  ALL_LANGUAGES: [
    { id: 1, name: 'English(US)', shortName: 'en' },
    { id: 126, name: 'English(UK)', shortName: 'uk' },
    { id: 22, name: 'Danish', shortName: 'dk' },
    { id: 23, name: 'German', shortName: 'de' },
    { id: 111, name: 'Swedish', shortName: 'se' },
    { id: 136, name: 'French', shortName: 'fr' },
    { id: 137, name: 'Spanish', shortName: 'es' },
    { id: 138, name: 'Italian', shortName: 'it' },
  ],
  CURRENCIES: [
    { id: 1, name: 'USD', symbol: '$ ' },
    { id: 11, name: 'EUR', symbol: '€ ' },
    { id: 19, name: 'GBP', symbol: '£ ' },
    { id: 32, name: 'DKK', symbol: 'DKK ' },
    { id: 112, name: 'SEK', symbol: 'SEK ' },
  ],
};
