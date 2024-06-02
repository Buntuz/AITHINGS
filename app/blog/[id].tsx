import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { BlogPost } from '@/types/BlogType';
interface BlogDetailProps {
  blogPost: BlogPost;
}

const BlogDetail = ({ blogPost }: BlogDetailProps) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.author}</p>
      <p>{blogPost.date}</p>
      <img src={blogPost.image} alt={blogPost.title} />
      <p>{blogPost.description}</p>
    </div>
  );
};

// Example implementation of getStaticProps and getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch blog post IDs
  const blogPosts = await fetch('https://your-api.com/blogposts').then(res => res.json());

  const paths = blogPosts.map((post: BlogPost) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const blogPost = await fetch(`https://your-api.com/blogposts/${id}`).then(res => res.json());

  return {
    props: {
      blogPost,
    },
  };
};

export default BlogDetail;
