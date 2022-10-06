export interface ProductImage {
  id: number;
  name: string;
  extension: string;
}
export interface ProductVideo {
  id: number;
  name: string;
  extension: string;
}
export interface productGalleryList {
  gallery_id: number;
  product_id: number;
  upload_id: number;
  name: string;
  extension: string;
  type: string;
}
export interface ProductGallery {
  id?: number;
  upload_id?: number;
  upload?: ProductImage;
  product_video?: ProductVideo;
  product_gallery?: productGalleryList;
}
