// ContactForm.js
import React from 'react';
import Container from './container';

const ContactForm = () => {
  return (
    <div className='bg-orange-50 relative md:h-[15rem] h-[25rem]'>
    <Container>
    <div className="flex flex-col lg:flex-row justify-between items-center bg-red-400  rounded-lg p-5 max-w-6xl mx-auto  text-white">

      <div className="w-full lg:w-1/2 space-y-2">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-3 py-2 rounded-full text-gray-700 focus:outline-none"
          required
        />
        
        <div className="flex space-x-4">
          <input
            type="email"
            placeholder="Email"
            className="w-1/2 px-3 py-2 rounded-full text-gray-700 focus:outline-none"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-1/2 px-3 py-2 rounded-full text-gray-700 focus:outline-none"
            required
          />
        </div>
        
        <input
          type="text"
          placeholder="Your location or address"
          className="w-full px-3 py-2 rounded-full text-gray-700 focus:outline-none"
          required
        />
      </div>

      
      <div className="w-full lg:w-1/2 flex justify-center mt-6 lg:mt-0">
        <img
          src="https://www.finline.in/assets/v3/img/contact-us.png"
          alt="Contact Us Illustration"
          className="max-w-full h-[15rem] rounded-lg"
        />
      </div>
    </div>
    </Container>
    </div>
  );
};

export default ContactForm;
