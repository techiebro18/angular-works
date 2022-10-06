import { Brand } from './brand';

export interface ProductApprovalImage {
  id: number;
  name: string;
  extension: string;
}

export interface ProductApproval {
  image?: any;
  discount_price?: any;
  id?: number;
  brand_id?: number;
  base_currency: string;
  brand_name?: string;
  brand: Brand;
  seo_url?: string;
  upload_id?: ProductApprovalImage;
  image_url?: string;
  extension?: string;
  name: string;
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
  regular_price: string;
  currency_id: number;
  language_id: number;
  currency_symbol: string;
  currency_code?: any;
  productConfig: any;
  price: number;
  translatesName: string;
  translatesDescription: string;
  is_wishlist?: number;
  user_id?: number;
  stock?: any;
  mother_page_id?: any;
  motherpage_seo_url?: any;
  style_seo_url?: any;
  brand_seo_url?: any;
  sku?: any;
  cost_of_good: string;
  categories: [];
  product_uploads: any;
  category: any;
  seller_sku: any;
  seller_sku_non_approved: any;
}
