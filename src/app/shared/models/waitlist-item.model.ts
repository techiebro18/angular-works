export interface WaitlistItem {
  id: number;
  language_id: number;
  currency_id: number;
  user_id: number;
  designer_id?: any;
  category_id?: any;
  mother_page_id?: any;
  type: string;
  is_deleted: string;
  reason?: any;
  alertreceive: string;
  updated_at: string;
  created_at: string;
  count: number;
  category: Category[];
  designer: any[];
  discover: Discover[];
  color: any[];
  material: any[];
  motherpage: any[];
  shoessize: any[];
  clothsize: any[];
  bagsize: any[];
}

interface Discover {
  id: number;
  waitlist_id: number;
  discover_id: number;
  created_at: string;
  name: string;
  ename: string;
}

interface Category {
  id: number;
  category_id: number;
  waitlist_id: number;
  updated_at: string;
  created_at: string;
  name: string;
  ename: string;
}
