"use client";
import React from 'react'
import ContactForm from '@/components/shared/ContactForm'
import Footer from '@/components/shared/Footer1';
import NavBar1 from '@/components/shared/NavBar1'

const ContactFormPage = () => {
  return (
    <div>
      <NavBar1 />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default ContactFormPage
