import React from 'react'
import Navbar from '../component/common/navbar'
import Invoice from '../component/home/form'
import SocialContact from '../component/common/socialConnect'
import ContactForm from '../component/common/contactForm'
import Footer from '../component/common/footer'

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