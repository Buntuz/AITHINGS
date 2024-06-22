// pages/about.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_PAGE_CONTENT } from '@/constants';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">{ABOUT_PAGE_CONTENT.title}</h1>
        <p className="text-lg mb-8">{ABOUT_PAGE_CONTENT.introduction}</p>

        <h2 className="text-3xl font-semibold mb-4">Our Services</h2>
        
        {ABOUT_PAGE_CONTENT.services.map((service, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
            <p>{service.content}</p>
          </div>
        ))}

        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-8">{ABOUT_PAGE_CONTENT.mission}</p>

        <h2 className="text-3xl font-semibold mb-4">Join Us</h2>
        <p className="mb-8">{ABOUT_PAGE_CONTENT.joinUs}</p>
      </motion.div>
    </div>
  );
};

export default About;
