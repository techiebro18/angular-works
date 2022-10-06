import { Category } from './category.interface';
import { Content } from './content';

export class ArticleDetail {
  id: number;
  post_author: string;
  post_date: string;
  post_content: string;
  description_for: string;
  post_title: string;
  post_name: string;
  post_modified: Date;
  archive_date: Date;
  updated_at: Date;
  created_at: Date;
  featured_image: string;
  featur_image_type: string;
  feature_img_extension: string;
  post_status: string;
  category_link: string;
  written_by: string;
  meta_title: string;
  meta_description: string;
  sections: Array<Content>;
  category: Category;
  author_field_name: string;
  author_tag_line: string;
  constructor() {
    this.sections = new Array<Content>();
  }
}
