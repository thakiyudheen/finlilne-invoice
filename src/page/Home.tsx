import React from 'react'
import Navbar from '../component/navbar'
import Invoice from '../component/form'
import SocialContact from '../component/socialConnect'
import ContactForm from '../component/contactForm'
import Footer from '../component/footer'

type Props = {}

export default function Home({ }: Props) {
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