import { Brand, BrandNameTranslation } from '../brand';
import { Category } from '@schemas/category.interface';
import { ProductMediaEntity } from '@schemas/product-media-entity.interface';

export interface ProductApprovalImage {
  id: number;
  name: string;
  extension: string;
}

export interface ProductApproval {
  additional_image_link?: string;
  approval_status?: string;
  bag_size_id?: number;
  base_currency?: string;
  brand_id?: number;
  brand_name?: string;
  brand_name_translation?: ProductApprovalAttrubute[];
  brand_seo?: any[];
  categories?: ProductApprovalCategory[];
  categories_parent_id?: number;
  category?: ProductApprovalCategory[];
  chain_length?: string;
  clothing_size_id?: number;
  color?: ProductApprovalAttrubute[];
  color_id?: string;
  comments?: any[];
  commission?: string;
  commission_user_emailid?: string;
  commission_user_id?: number;
  commission_user_type?: string;
  condition_code_id?: string;
  condition_code_values?: any[];
  condition_codes?: any[];
  condition_description?: string;
  condition_rating?: string;
  conditions?: any;
  cost?: ProductApprovalCostItem[];
  cost_of_good_DKK?: number;
  cost_of_good_EUR?: number;
  cost_of_good_GBP?: number;
  cost_of_good_SEK?: number;
  cost_of_good_USD?: number;
  country_of_origin?: string;
  creation_timestamp?: number;
  date_code?: string;
  deleted?: boolean;
  depth?: number;
  description?: string;
  description_code_id?: string | number;
  descriptions?: ProductApprovalAttrubute[];
  discount?: number;
  discount_price?: ProductApprovalCostItem[];
  discount_price_DKK?: number;
  discount_price_EUR?: number;
  discount_price_GBP?: number;
  discount_price_SEK?: number;
  discount_price_USD?: number;
  discover?: any[];
  discovers?: any[];
  draft?: boolean;
  extension?: string;
  extra_code?: string | [];
  extra_code_desc?: string;
  extra_code_id?: string;
  extra_codes?: any[];
  fixed_discount?: number;
  gender?: string;
  google_category_id?: number;
  google_product_category?: number;
  handle_drop?: string;
  id?: string;
  identifier_exists?: boolean;
  image_link?: string;
  image_url?: string;
  imgix_image_url?: string;
  information_correct?: boolean;
  is_discount?: number;
  is_special_tax?: string;
  item_group_id?: string | number;
  item_location?: any;
  item_location_id?: number;
  language_id?: number;
  length?: number;
  main_category?: string;
  material?: ProductApprovalAttrubute[];
  material_id?: number;
  measurement?: string;
  media_entities?: ProductMediaEntity[];
  media_folder?: string;
  modified_timestamp?: number;
  mysql_id?: number;
  name?: string;
  other_data?: string;
  pandant_measurement?: string;
  parent_brand_seo?: ProductApprovalAttrubute[];
  parent_category?: string;
  photo_edited?: any;
  post_ckeditor_type?: number;
  post_condition_code_type?: number;
  post_extra_code_type?: number;
  product_type?: any;
  regular_price?: ProductApprovalCostItem[];
  regular_price_DKK?: number;
  regular_price_EUR?: number;
  regular_price_GBP?: number;
  regular_price_SEK?: number;
  regular_price_USD?: number;
  ring_size?: number;
  seller_item_amount?: any;
  seller_sku?: string;
  seo_url?: string;
  serial_number?: string;
  shipping?: any;
  shoes_size_id?: number;
  shoulder_drop?: string;
  size?: any[];
  size_marketing?: any;
  sku?: string;
  special_tax_percent?: any;
  status?: string;
  stock?: number;
  styles?: any[];
  tarif_number?: any;
  total_wishlisted?: number;
  vip_price?: any;
  width?: number;
}

export interface ProductApprovalAttrubute {
  id?: number;
  lang?: string;
  value?: string;
}

export interface ProductApprovalCategory {
  id?: number;
  name?: string;
}

interface ProductApprovalCostItem {
  currency: string;
  value: number;
}
