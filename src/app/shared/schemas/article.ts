import { Category } from './category.interface';

export class Article {
  id: number;
  post_author: string;
  post_category: string;
  category_title: string;
  post_date: Date;
  post_name: string;
  post_status: string;
  featured_image: string;
  alt_feature: string;
  featur_image_type: string;
  feature_img_extension: string;
  updated_at: Date;
  created_at: Date;
  post_modified: Date;
  post_title: string;
  post_content: string;
  description_for: string;
  published_date: string;
  language_id: number;
  meta_title: string;
  meta_description: string;
  archive_date: Date;
  category: Category;
  sort: number;
  constructor() {}
}
