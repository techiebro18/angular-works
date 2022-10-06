export interface CategoryImage {
  id: number;
  name: string;
  extension: string;
}

export interface Category {
  id?: number;
  category_ckeditor_type?: number;
  created_at: string;
  deleted?: string;
  description?: string;
  google_category_id?: string;
  google_category_name?: string;
  is_clickable?: string;
  is_featured?: string;
  is_menu: string;
  language_id?: number;
  level?: number;
  meta_description?: string;
  meta_title?: string;
  name: string;
  name_da?: string;
  name_de?: string;
  name_en?: string;
  name_es?: string;
  name_fr?: string;
  name_it?: string;
  name_sv?: string;
  parent_id: number;
  seo_url?: string;
  seo_url_da?: string;
  seo_url_de?: string;
  seo_url_en?: string;
  seo_url_es?: string;
  seo_url_fr?: string;
  seo_url_it?: string;
  seo_url_sv?: string;
  sort_order?: number;
  status: string;
  sub_desc_ckeditor_type?: number;
  sub_description?: string;
  sub_title?: string;
  updated_at: string;
  upload?: CategoryImage;
  upload_id: number;

  category_title: string;
  cat_meta_title: string;
  cat_meta_description: string;
}

export interface CategoryDetail {
  id?: number;
  seo_url?: string;
  name: string;
  translate_name?: string;
  description?: string;
  translate_description?: string;
  image_url?: any;
  extension?: any;
  meta_title?: string;
  meta_description?: string;
  trans_meta_title?: string;
  trans_meta_description?: string;
}

export interface CategoryFilter {
  id?: number;
  seo_url?: string;
  parent_id: number;
  name: string;
  description?: string;
  upload?: CategoryImage;
  status?: string;
  is_menu: string;
  is_featured: string;
  is_clickable: string;
  sort_order: number;
  deleted?: string;
  modified_on?: string;
  created_on: string;
  language_id?: number;
  is_translate?: number;
}

export interface BrandImage {
  id: number;
  name: string;
  extension: string;
}

export interface Brand {
  id?: number;
  seo_url?: string;
  name: string;
  description?: string;
  upload?: BrandImage;
  status?: string;
  is_menu: string;
  sort_order: number;
  deleted?: string;
  modified_on?: string;
  created_on: string;
  language_id?: number;
  is_translate?: number;
}

export interface Color {
  data?: any;
}

export interface Size {
  data?: any;
}

export interface DesignerDetail {
  style: any;
  id?: number;
  seo_url?: string;
  name: string;
  translate_name?: string;
  description?: string;
  translate_description?: string;
  image_url?: any;
  extension?: any;
  meta_title?: string;
  meta_description?: string;
  trans_meta_title?: string;
  trans_meta_description?: string;
}

export interface DiscoverImage {
  id: number;
  name: string;
  extension: string;
}

export interface Discover {
  id?: number;
  seo_url?: string;
  parent_id: number;
  name: string;
  description?: string;
  upload?: DiscoverImage;
  status?: string;
  is_menu: string;
  sort_order: number;
  deleted?: string;
  modified_on?: string;
  created_on: string;
  brand_id?: number;
  language_id?: number;
  is_translate?: number;
}

export interface DiscoverDetail {
  id?: number;
  seo_url?: string;
  name: string;
  translate_name?: string;
  description?: string;
  translate_description?: string;
  image_url?: any;
  extension?: any;
  meta_title?: string;
  meta_description?: string;
  trans_meta_title?: string;
  trans_meta_description?: string;
  title?: string;
  content?: string;
  brand_id?: number;
  sort_order?: number;
  deleted?: string;
  translate_style?: string;
}

export interface DiscoverFilter {
  id?: number;
  seo_url?: string;
  parent_id: number;
  name: string;
  description?: string;
  upload?: DiscoverImage;
  status?: string;
  is_menu: string;
  is_featured: string;
  is_clickable: string;
  sort_order: number;
  deleted?: string;
  modified_on?: string;
  created_on: string;
  language_id?: number;
  is_translate?: number;
}
