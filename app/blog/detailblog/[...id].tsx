import { notFound } from 'next/navigation';
import { BlogPost } from '@/types/BlogType';
import axios from 'axios';
import { BASE_URL } from '@/config/config';
import Image from 'next/image'

interface BlogDetailProps {
  params: {
    id: string;
  };
}

async function fetchBlogPost(id: string): Promise<BlogPost | null> {
  //const res = await fetch(`https://www.buntutechsolutions.co.za/api/categorylist/${id}`);
  //const res = await fetch(`https://www.buntutechsolutions.co.za/api/posts`);
  //if (!res.ok) return null;
 // const blogPost = await res.json();
  //const blogPost = JSON.parse(response.data);
  //alert(id)
  console.log(id);
  //const response = await axios.get(`${BASE_URL}/api/posts/${id}`);
  //const response = await axios.get(`${BASE_URL}/api/postbyid/${id}`);
  const response = await axios.get(`https://www.buntutechsolutions.co.za/api/postbyid/15`);
  
  //https://www.buntutechsolutions.co.za/api/postbyid/1
  const blogPostData = JSON.parse(response.data); // Convert string to JSON object
  if (Array.isArray(blogPostData) && blogPostData.length > 0) {
    return blogPostData[0]; // Assuming the array contains the blog post object
  }

  return blogPostData;
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  
  console.log(params)
  const blogPost = await fetchBlogPost(params.id);

  if (!blogPost) {
    notFound();
  }

  return (
          <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{blogPost.title}</h1>
      <div className="flex items-center space-x-4 mb-6">
        <img
          className="w-10 h-10 rounded-full"
          src="https://via.placeholder.com/40" // Placeholder image for author
          alt={blogPost.author}
        />
        <div>
          <p className="text-lg font-semibold text-gray-700">{blogPost.author}</p>
          <p className="text-sm text-gray-500">{blogPost.date}</p>
        </div>
      </div>
      <div className="relative h-96 mb-6">

      

        {/*<Image
        
          src={blogPost.image}
          alt={blogPost.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
  /> */}
      </div>
      <p className="text-gray-700 leading-relaxed">{blogPost.description}</p>
    </div>
  
          </>
  );
}
