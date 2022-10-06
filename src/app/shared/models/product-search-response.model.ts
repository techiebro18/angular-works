export interface ProductSearchResponseModel {
  id: string;
  name: string;
  names: BrandNameTranslation[];
  stock: number;
  description: string;
  descriptions: BrandNameTranslation[];
  extension?: any;
  sku: string;
  cost: Cost[];
  size: any[];
  category: BrandNameTranslation[];
  material: BrandNameTranslation[];
  styles: BrandNameTranslation[];
  color: BrandNameTranslation[];
  discover: BrandNameTranslation[];
  draft: boolean;
  discount?: any;
  measurement?: any;
  categories_parent_id: number;
  status: string;
  commission: string;
  gender: string;
  conditions?: any;
  length: number;
  width: number;
  depth: number;
  shipping?: any;
  destinations: string[];
  removeBgUrl?: any;
  pausedUpdateTime: number;
  feedHashCode: number;
  relisted: boolean;
  condition_codes: any[];
  mysql_id: number;
  main_category: string;
  image_url?: any;
  is_discount: number;
  brand_id: number;
  commission_user_id: number;
  seller_sku: string;
  fixed_discount?: any;
  total_wishlisted: number;
  imgix_image_url: string;
  product_type: string;
  commission_user_type: string;
  creation_timestamp: number;
  modified_timestamp: number;
  approved_at: number;
  rejected_at?: any;
  price_timestamp: number;
  shoulder_drop?: any;
  country_of_origin: string;
  brand_name: string;
  base_currency: string;
  seller_item_amount?: any;
  original_cost: number;
  original_currency?: any;
  seller_actual_cost: number;
  seller_actual_cost_currency?: any;
  regular_price: Cost[];
  discount_price: Cost[];
  brand_seo: BrandNameTranslation[];
  parent_brand_seo: BrandNameTranslation[];
  brand_name_translation: BrandNameTranslation[];
  parent_category: BrandNameTranslation[];
  deleted: boolean;
  is_special_tax: string;
  condition_description?: any;
  chain_length?: any;
  pandant_measurement?: any;
  heel_height?: any;
  shaft_height?: any;
  handle_drop?: any;
  date_code?: any;
  media_entities: MediaEntity[];
  approval_status: string;
  tarif_number?: any;
  seo_url: string;
  other_data: string;
  condition_rating: string;
  item_location_id: number;
  post_ckeditor_type: number;
  post_condition_code_type: number;
  post_extra_code_type: number;
  extra_code?: any;
  description_code_id?: any;
  photo_edited?: any;
  information_correct?: any;
  language_id?: any;
  special_tax_percent?: any;
  google_category_id?: any;
  google_product_category?: any;
  image_link?: any;
  item_group_id?: any;
  size_marketing?: any;
  media_folder: string;
  serial_number?: any;
  item_location?: any;
  campaign_id: string;
}

export interface BrandNameTranslation {
  id: number;
  lang: Lang;
  value: null | string;
}

export enum Lang {
  Da = 'da',
  De = 'de',
  En = 'en',
  Es = 'es',
  Fr = 'fr',
  It = 'it',
  Sv = 'sv',
}

export interface Cost {
  currency: string;
  value: number;
}

export interface MediaEntity {
  uuid: string;
  deleted: boolean;
  content: boolean;
  gallery: boolean;
  qc: boolean;
  file_name?: any;
  original_url?: any;
  compact_url: string;
  large_url: string;
  xlarge_url: string;
  thumb_url: string;
  medium_url: string;
  extension?: any;
  display_order: number;
  type: Type;
  id?: any;
}

export enum Type {
  Image = 'image',
}
