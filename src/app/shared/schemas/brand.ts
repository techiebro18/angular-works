export interface BrandImage {
  id: number;
  name: string;
  extension: string;
}

export interface BrandNameTranslation {
  id: number;
  lang: string;
  value: string;
}

export interface Brand {
  id?: number;
  brand_ckeditor_type: number;
  created_at: string;
  deleted?: string;
  description?: string;
  is_menu?: string;
  language_id?: number;
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
  updated_at?: string;
  upload?: BrandImage;
  upload_id: number;

  // these fields were removed from database
  is_translate?: number;
}

export interface Color {
  data?: any;
}

export interface Size {
  data?: any;
}

export interface DesignerDetail {
  id?: number;
  name: string;
  description?: string;
  seo_url?: string;
  translate_name?: string;
  translate_description?: string;
  image_url?: string;
  extension?: string;
  meta_title?: string;
  meta_description?: string;
  trans_meta_title?: string;
  trans_meta_description?: string;
}
