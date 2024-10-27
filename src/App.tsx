import { lazy, useState } from 'react'
import './App.css'
import Invoice from './component/form'
import Navbar from './component/navbar'
import Footer from './component/footer'
import ContactForm from './component/contactForm'
import SocialContact from './component/socialConnect'

function App() {

  return (
    <>
      <Navbar />
      <Invoice />
      <SocialContact />
      <ContactForm />
      <Footer />
    </>
  )
}

export default App
