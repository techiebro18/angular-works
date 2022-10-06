export interface Seller {
  id?: number;
  first_name: string;
  last_name?: string;
  country: string;
  image_id: string;
  company_name: string;
  username: string;
  role_id: number;
  member_description?: string;
}

export interface APIv2SellerWrapper {
  user: Seller;
}
