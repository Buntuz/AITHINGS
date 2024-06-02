import { notFound } from 'next/navigation';
import { BlogPost } from '@/types/BlogType';
interface BlogDetailProps {
  params: {
    id: string;
  };
}

async function fetchBlogPost(id: string): Promise<BlogPost | null> {
  const res = await fetch(`https://your-api.com/blogposts/${id}`);
  if (!res.ok) return null;
  const blogPost = await res.json();
  return blogPost;
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  const blogPost = await fetchBlogPost(params.id);

  if (!blogPost) {
    notFound();
  }

  return (
    <div>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.author}</p>
      <p>{blogPost.date}</p>
      <img src={blogPost.image} alt={blogPost.title} />
      <p>{blogPost.description}</p>
    </div>
  );
}
