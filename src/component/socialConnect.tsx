import React from 'react';
import { FaWhatsapp, FaHeadset, FaFacebook } from 'react-icons/fa';

const SocialContactButton = ({ link, Icon, borderColor, hoverColor }: any) => (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center hover:bg-green-500 px-4 py-2 rounded-full border ${borderColor} text-gray-600 hover:${hoverColor} hover:text-white transition`}
    >
        <Icon className="text-2xl text-green-500  hover:text-white" />
    </a>
);

const SocialContact = () => {
    return (
        <div className="flex flex-col items-center md:justify-center space-y-4 my-8">
            <h2 className="text-md  text-gray-700 text-center">
                Get help from our experts. Drop us a WhatsApp message now!!

            </h2>
            <div className="flex space-x-4">
                
                <a
                    href={"https://wa.me/your_number"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center border-green-500 hover:text-white hover:bg-green-500 px-4 py-2 rounded-full border  text-gray-600  hover:text-white transition`}
                >
                    <FaWhatsapp className="text-2xl text-green-500  hover:text-white" />
                </a>
                <a
                    href={"mailto:support@yourdomain.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center border-red-500 hover:bg-red-500 px-4 py-2 rounded-full border border-red text-gray-600  hover:text-white transition`}
                >
                    <FaHeadset className="text-2xl text-red-500  hover:text-white" />
                </a>
               

            </div>
        </div>
    );
};

export default SocialContact;
