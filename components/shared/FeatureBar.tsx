"use client"
import React, { useState } from 'react'

import {
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { BlogPost } from '@/types/BlogType';
  

import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import CardBlogBar from './blog/CardBlog'

const features = [
  {
    name: 'Push to deploy.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Database backups.',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
]

const posts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 4,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
]

const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    role: 'Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: null,
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Director of Product',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: null,
  },
]


const blogPostData: BlogPost[] = [
  { id: 1,
    title: 'How to Build a Blog with React.',
    author: 'John Doe',
    date: 'July 12, 2023',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    description:
      'Sed cursus ante dapibus diam.',
      category: "Tech"
  },
  {
    id: 2,
    title: '10 Tips for Effective Time Management',
    author: 'Jane Smith',
    date: 'August 5, 2023',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    description:
      'Sed cursus ante dapibus diam.',
      category: "Tech"
  }
  ,
  {
    id: 3,
    title: '10 Tips for Effective Time Management',
    author: 'Jane Smith',
    date: 'August 5, 2023',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    description:
      'Sed cursus ante dapibus diam.',
      category: "Sports"
  },
  { id: 4,
    title: 'How to Build a Blog with React and Tailwind CSS',
    author: 'John Doe',
    date: 'July 12, 2023',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    description:
      'Sed cursus ante dapibus diam.',
      category: "Recent"
  }
];

const blogCategories = [
  { name: 'Recent', count: blogPostData.filter(post => post.category === 'Recent').length },
  { name: 'Tech', count: blogPostData.filter(post => post.category === 'Tech').length },
  { name: 'Sports', count: blogPostData.filter(post => post.category === 'Sports').length },
  // more categories...
];

const FeatureBar = () => {

  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryClick = (category: React.SetStateAction<string>) => {
   // alert(category)
    setSelectedCategory(category);
  };

  const filteredBlogs = selectedCategory === 'All'
    ? blogPostData
    : blogPostData.filter(blogpost => blogpost.category === selectedCategory);

    
  return (
    <>

            
            {/* 
                <div className="md:container md:mx-auto sm:container lg:container bg-orange-400">
                          <div className="flex flex-wrap">
                              
                                <div className='flex-auto w-96'>
                                    <div className='flex items-center flex-wrap mt-1 justify-center gap-1'>
                                    
                                    {blogPostData.map((blogpost) => (
                                      <CardBlogBar key={blogpost.id} blogpost={blogpost} />
                                    ))}
                                                                
                                    </div>
                                </div>

                                <div className='flex-auto w-28'>
                                <div className="relative flex flex-col text-gray-700 shadow-md w-96 rounded-xl bg-clip-border">
                                    <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                                      <div role="button"
                                        className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                        Inbox
                                        <div className="grid ml-auto place-items-center justify-self-end">
                                          <div
                                            className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-gray-900 uppercase rounded-full select-none whitespace-nowrap bg-gray-900/10">
                                            <span className="">14</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div role="button"
                                        className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                        Spam
                                        <div className="grid ml-auto place-items-center justify-self-end">
                                          <div
                                            className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-gray-900 uppercase rounded-full select-none whitespace-nowrap bg-gray-900/10">
                                            <span className="">2</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div role="button"
                                        className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                        Trash
                                        <div className="grid ml-auto place-items-center justify-self-end">
                                          <div
                                            className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-gray-900 uppercase rounded-full select-none whitespace-nowrap bg-gray-900/10">
                                            <span className="">40</span>
                                          </div>
                                        </div>
                                      </div>
                                    </nav>
                                  </div>
                                </div>
                          </div>
                </div>
          */}  
          <div className="md:container md:mx-auto sm:container lg:container bg-orange-400">
            <div className="flex flex-wrap">
              {/* Left side: Featured Blogs */}
              
              {/*
              <div className="flex-auto md:w-2/3 p-2">
                <div className="flex items-center flex-wrap mt-1 justify-center gap-1">
                  
                {filteredBlogs.map(blogpost => (
                  <CardBlogBar key={blogpost.id} blogpost={blogpost} />
                ))}

                  <h2 className="text-lg font-bold break-before-left">Recent Blogs</h2> 
                  {blogPostData
                    .filter(blogpost => blogpost.category === 'Recent')
                    .map(blogpost => (
                      <CardBlogBar key={blogpost.id} blogpost={blogpost} />
                    ))}
                  <h2 className="text-lg font-bold mt-4">Tech</h2> <br />
                  {blogPostData
                    .filter(blogpost => blogpost.category === 'Tech')
                    .map(blogpost => (
                      <CardBlogBar key={blogpost.id} blogpost={blogpost} />
                    ))}
                  <h2 className="text-lg font-bold mt-4">Sports</h2>
                  {blogPostData
                    .filter(blogpost => blogpost.category === 'Sports')
                    .map(blogpost => (
                      <CardBlogBar key={blogpost.id} blogpost={blogpost} />
                    ))}
                </div>
                
                </div>
              </div> */}

              {/* Left side: Featured Blogs */}
                <div className="flex-auto md:w-2/3 p-2">
                <div className="flex items-center flex-wrap mt-1 justify-center gap-1">
                  {filteredBlogs.map(blogpost => (
                    <CardBlogBar key={blogpost.id} blogpost={blogpost} />
                  ))}
                </div>
              </div>

        {/* Right side: Blog Categories */}
        <div className="flex-auto md:w-1/3 p-2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Blog Categories</h2>
            <ul className="space-y-2">
              <li
                key="all"
                className={`flex justify-between items-center cursor-pointer p-2 ${selectedCategory === 'All' ? 'bg-blue-100' : ''}`}
                onClick={() => handleCategoryClick('All')}
                
              >
                <span className="text-lg text-gray-700">All</span>
                <span className="text-sm text-gray-500">{blogPostData.length}</span>
              </li>

              {blogCategories.map((category, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center cursor-pointer p-2 ${selectedCategory === category.name ? 'bg-blue-100' : ''}`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <span className="text-lg text-gray-700">{category.name}</span>
                  <span className="text-sm text-gray-500">{category.count}</span>
                </li>
              ))}
            </ul>


          </div>
        </div>


            </div>
          </div>

    </>
   
  )
}

export default FeatureBar
