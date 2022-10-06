export interface CategoryImage {
  id: number;
  name: string;
  extension: string;
}
export interface Category {
  id?: number;
  seo_url?: string;
  parent_id: number;
  name: string;
  description?: string;
  upload?: CategoryImage;
  status?: string;
  is_menu: string;
  sort_order: number;
  deleted?: string;
  modified_on?: string;
  created_on: string;
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
