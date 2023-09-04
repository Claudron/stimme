interface ContentImage {
  image: string;
}

interface Category {
  name: string;
}

interface Tag {
  label: string;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    date_created: string; 
    date_update: string; 
    thumbnail?: string; 
    content_image?: ContentImage[];
    embed_video_url: string;
    category: Category[];   
    tags: Tag[];            
}
