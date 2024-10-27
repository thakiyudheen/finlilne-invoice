import React, { useRef, useState } from 'react';
import { PiFolderOpenFill } from 'react-icons/pi';
import { FileUpload } from '../_lib/cloudinary/imageUpload';
import { Circles } from 'react-loader-spinner'; 
import { toast } from 'sonner';

interface ImageUploaderProps {
  setFieldValue: (field: string, value: any) => void;
  imageFieldName: string;
  url:string ;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setFieldValue, imageFieldName ,url }) => {
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); 
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setIsLoading(true); 

      const result = await FileUpload(file);
      
      setIsLoading(false); 

      if (result) {
          setUploadResult(result.secure_url);
          setFieldValue(imageFieldName, result.secure_url); 
          toast.success('Uploaded successfully!')
        console.log("File uploaded successfully", result.secure_url);
      } else {
        setSelectedImage(null)
        setUploadResult(null);
        console.error("File upload failed");
      }
    }
  };

  const handleFolderClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="md:w-1/2 w-full ">
      <div className="border h-37 w-72 p-3 items-center border-gray-500 flex justify-center rounded-lg">
        <div className="h-24 w-64 flex items-center justify-center border border-dashed border-gray-600 rounded-lg">
          {isLoading ? (
            <Circles
              height="50" 
              width="50"  
              color="#6B46C1" 
              ariaLabel="circles-loading" 
              wrapperStyle={{}} 
              wrapperClass="" 
              visible={true} 
            />
          ) : uploadResult ? (
            <img src={uploadResult} alt="Uploaded logo" className="h-full object-contain" />
          ) : selectedImage ? (
            <img src={selectedImage} alt="Selected preview" className="h-full object-contain" />
          ) :url ? (
            <img src={url} alt="Selected preview" className="h-full object-contain" />
          ) : (
            <div className='flex flex-col justify-center items-center'>
            <span className="text-center font-bold text-1xl">Company</span>
            <span className="text-center font-bold text-5xl">LOGO</span>
            </div>
          )}
        </div>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <div
        onClick={handleFolderClick}
        className="bg-purple-700 text-white flex justify-center items-center w-[27%]  md:w-[14%] px-6 py-3 mt-4 mb-[1rem] rounded-full relative md:ml-[22%] ml-[6.8rem]"
      >
        <PiFolderOpenFill className="text-[18px]" />
      </div>
    </div>
  );
};

export default ImageUploader;
