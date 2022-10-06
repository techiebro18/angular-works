import { Picture } from './picture';
import { ProductItem } from './product_item';

export class Content {
  image_url: Array<Picture>;
  image_url2: Array<Picture>;
  type: string;
  type2: string;
  title: string;
  text: string;
  text2: string;
  full_picture = false;
  description_first = true;
  instagram_id: string;
  instagram_id2: string;
  product_id: any;
  product_detail: any;
  productitem: Array<ProductItem>;

  constructor() {
    this.image_url = new Array<Picture>();
  }
}
