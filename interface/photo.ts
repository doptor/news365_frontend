export interface Photo {
  thumb_photo: string;
  large_photo: string;
  phot_title: string;
  photo_reference: null | string;
}

export interface Post {
  category_name: string;
  category: string;
  id: number;
  post_by_image: string;
  post_by_name: string;
  post_by_id: number;
  title: string;
  timestamp: number;
  photos: Photo[];
}

export interface Category {
  category_name: string;
  slug: string;
  posts: Post[];
}
