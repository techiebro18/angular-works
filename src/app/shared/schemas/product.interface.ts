export interface ProductGalleryImage {
  gallery_id: number;
  upload_id: number;
  product_id: number;
  name: string;
  extension: string;
  image?: string;
  thumbImage?: string;
}

export interface ProductGallerySecondImage {
  gallery_id: number;
  upload_id: number;
  product_id: number;
  name: string;
  extension: string;
  image?: string;
  thumbImage?: string;
}

export interface CategoryProductPivot {
  category_id: number;
  product_id: number;
}

export interface ProductCategories {
  id: number;
  name: string;
  value?: string;
  lang?: string;
  pivot: CategoryProductPivot;
}

export interface ProductVideo {
  id: number;
  name: string;
  extension: string;
}

export interface ProductVariantOption {
  id: number;
  name: string;
}

export interface ProductVariant {
  id: number;
  name: string;
  product_variant_option: Array<ProductVariantOption>;
}

export interface ProductSku {
  fixed_discount: any;
  stock: any;
  id: number;
  product_id: number;
  type: string;
  sku: string;
  sku_tvb: string;
  cost_of_good: number;
  regular_price: number;
  vip_price: number;
  is_special_tax: string;
  special_tax_percent: number;
  discount: number;
  qty: number;
}

export interface Product {
  id?: string;
  designer: string;
  brand_id?: number;
  brand_name?: string;
  seo_url?: string;
  upload_id?: ProductImage;
  image_url?: string;
  extension?: string;
  condition_rating?: number;
  name: string;
  title: string;
  productName?: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  productDescription?: string;
  product_for?: string;
  featured_product?: string;
  on_sale?: string;
  best_seller?: string;
  comming_soon_date?: string;
  status?: string;
  deleted?: string;
  updated_at?: string;
  created_at: string;
  regular_price: number;
  currency_id: number;
  language_id: number;
  currency_symbol: string;
  currency_code?: any;
  productConfig: any;
  price: number;
  translatesName: string;
  translatesDescription: string;
  is_wishlist?: number;
  user_id?: number | null;
  stock?: any;
  mother_page_id?: any;
  motherpage_seo_url?: any;
  style_seo_url?: any;
  brand_seo_url?: any;
  sku?: any;
  position?: string;
  discounted_price: number;
  base_currency: string;
  ready_for_approval: any;
  information_correct: any;
  photo_edited: any;
  fixed_discount: any;
  seller_sku: any;
  discount: any;
  vip_price: any;
  cost_of_good: any;
  is_special_tax: any;
  product_gallery_imgix: Array<ProductGalleryImage>;
  product_gallery_second_imgix: Array<ProductGallerySecondImage>;
  product_uploads: ProductImage;
  extra_code_desc: any;
  other_data: any;
  extra_code_id: any;
  post_extra_code_type: any;
  post_other_data: any;
  product_type: any;
  commission_user_id: any;
  commission_user_emailid: string;
  item_location: any;
  color_id: any;
  condition_description: any;
  color_code: any;
  colors?: any;
  size_code: any;
  condition_code: any;
  extra_code: any;
  prod_desc_code: any;
  designer_name: any;
  style_name: any;
  discovers: any;
  categories: Array<ProductCategories>;
  categoryname: string;
  upload: ProductImage;
  product_video: ProductVideo;
  product_gallery: Array<ProductGalleryImage>;
  product_variant: Array<ProductVariant>;
  product_sku: Array<ProductSku>;
  isTranslate?: number;
  post_ckeditor_type?: any;
  post_condition_code_type?: any;
  color?: any;
  size?: any;
  whattowear?: any;
  sections?: any;
  conditions: any;
  image_link: any;
  image_link_type: any;
  google_product_category: any;
  google_category_id: any;
  additional_image_link: any;
  item_group_id: any;
  gender: any;
  shipping?: any;
  identifier_exists: any;
  size_marketing: any;
  age_group: any;
  productlist: any;
  totalrow: any;
  country_of_origin: any;
  tarif_number: any;
  product_style: any;
  item_location_id: number;
  material_id: any;
  commission_user_type: any;
  commission: any;
  commission_user: any;
  shoulder_drop: any;
  handle_drop: any;
  chain_length: any;
  pandant_measurement: any;
  measurement: any;
  date_code: any;
  condition_code_id: any;
  description_code_id: any;
  shoes_size_code: any;
  cloth_size_code: any;
  shoes_size_id: any;
  clothing_size_id: any;
  bag_size_id: any;
  size_id: any;
  child_category: any;
  condition_value: any;
  parent_category: any;
  approval_status: any;
  material_name?: string;
  material?: string;
  style: any;
  clothing_size: any;
  shoes_size: any;
  bag_size: any;
  user: any;
  waitlist: any;
  mat_id: any;
  final_col_id: any;
  shoe_id: any;
  bag_id: any;
  clothing_id: any;
  alertreceive: any;
  imgix_image_url: string;
  parentCategories: Array<{ id: number; lang: string; value: string }>;
  is_out_of_stock: boolean;
}
export interface ProductId {
  id: number;
  error_message: string;
}
export interface RemoveCart {
  cart_id: number;
  status: string;
  error_message: string;
}
export interface ShippingDetails {
  shipping_price: number;
  currency: string;
  id: any;
  name: any;
  carrier_code: any;
  error_message: string;
  status: string;
}
export interface AddToCart {
  product_id: number;
  cart_id: number;
  name: string;
  price: number;
  description: string;
  size: string;
  color: string;
  photo: string;
  quantity: number;
  user_id: number;
  status: string;
  error_message: string;
  regular_price: number;
  currency_id: number;
  language_id: number;
  currency_symbol: string;
  productConfig: any;
  tax: number;
  price_with_tax: number;
  currencyCode: string;
  currencySymbol: string;
  items: any;
  special_tax_amount: number;
  cost_of_good: number;
  brand_name: string;
  productName: any;
  motherpage_seo_url: any;
  stock: any;
  sku: any;
  brand_seo_url: any;
}

export interface ProductImage {
  id: number;
  name: string;
  extension: string;
}

export interface CommonFilterFormat {
  value: any;
  label: any;
}
// For create alert section //
export interface FilterRecordNew {
  category: any;
  subcategory: any;
  designer: any;
  style: any;
  color: any;
  shoes_size: any;
  bag_size: any;
  cloth_size: any;
  style_seo_url?: any;
  designer_seo_url?: any;
  parent_category_seo_url?: any;
  child_category_seo_url?: any;
  discover_seo_url?: any;
}
// end for create alert section //
export interface FilterRecord {
  categoryIds: any;
  brandIds: any;
  colors: any;
  sizes?: any;
  error_message: string;
  status: string;
  range: any;
  sort_order: any;
  category_seo_url: any;
  parent_category_seo_url: any;
  child_category_seo_url: any;
  grand_child_category_seo_url: any;
  currency_id: any;
  language_id: any;
  filtertype: any;
  user_id: any;
  searchString: any;
}

export interface FilterRecordCount {
  countProducts: any;
}

export interface FilterPrice {
  // then(arg0: (data: any) => void);
  min_price: any;
  max_price: any;
}
export interface WishListData {
  listType: any;
  categoryName: any;
}
export interface CouponCode {
  code?: any;
  type?: any;
  value?: any;
  amount?: any;
}

export interface CheckoutData {
  order_id?: number;
  grandTotal?: number;
}

export interface StyleImage {
  id: number;
  name: string;
  extension: string;
  image_url: string;
}
export interface Style {
  sub_title: string;
  sub_description: string;
  condition_category_id: any;
  id?: number;
  brand_id?: number;
  seo_url?: string;
  name: string;
  description?: string;
  upload?: StyleImage;
  status?: string;
  is_menu: string;
  sort_order: number;
  deleted?: string;
  modified_on?: string;
  created_on: string;
  language_id?: number;
  is_translate?: number;
  meta_title?: string;
  meta_description?: string;
  style_ckeditor_type?: any;
  waitlistcontent?: string;
  waitlistform?: string;
  noindex?: any;
  condition_code_id: any;
  color_id: any;
  bag_size_id: any;
  shoes_size_id: any;
  clothing_size_id: any;
  upload_id?: number;
  updated_at?: string;
  created_at?: string;
  image_url?: any;
  translate_style: any;
  trans_meta_title?: string;
  trans_meta_description?: string;
  title?: string;
  content?: string;
}
