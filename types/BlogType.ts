// types.ts

export interface BlogPost {
    id: number;
    title: string;
    author: string;
    date: string;
    image: string;
    description: string;
    category: string;
  }
  
  export interface CardProps {
    blogpost: BlogPost;
  }
  
  