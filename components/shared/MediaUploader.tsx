"use client";
import React from 'react'
import { dataUrl, getImageSize } from '@/lib/utils';
import { useToast } from '../ui/use-toast';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

type MediaUplaoderProps= {
    onValueChange : (value: string) => void;
    setImage: React.Dispatch<any>;
    publicId: string;
    image: any
    type: string;
}

const MediaUploader = ({
    onValueChange,
    setImage,
    image,
    publicId,
    type
}: MediaUplaoderProps) => {

   const { toast } = useToast(); 
   const onUploadSuccessHandler=(result : any)=>{
     setImage((prevState: any)=>({
        ...prevState,
        publicId: result?.info?.public_id,
        //Here ? is optional chaining operator
        width: result?.info?.width,
        height: result?.info?.height,
        secureURL: result?.secure_url
        // When you use ?. to access a property, if the object on the left side of the ?. is null or undefined, the expression short-circuits and returns undefined instead of throwing an error.
     }))

     onValueChange(result?.info?.public_id)


     toast({
        title: "Image Uploaded Successfully",
        description: '1 credit was deducted from your account',
        duration: 5000,
        className: "success-toast"
     })
   }
   const onUploadErrorHandler = ()=>{
        toast({
            title: "Something went wrong while uploading",
            description: "Please try again",
            duration: 5000,
            className: 'error-toast'
        })
    }

  return (
   <CldUploadWidget
   uploadPreset="tushar_dev"
   options={{
    multiple: false,
    resourceType: "image"
   }}
   onSuccess={onUploadSuccessHandler}
   onError= {onUploadErrorHandler}
   >
   {({open})=>(
    <div className="flex flex-col gap-4">
     <h3 className="h3-bold text-dark-600">
       Original
     </h3>

     {publicId ? (
        <>
             <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage 
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="media-uploader_cldImage"
                />
              </div>
        </>
     ): (
        <div className="media-uploader_cta" onClick={() => open()}>
        <div className="media-uploader_cta-image">
          <Image 
            src="/assets/icons/add.svg"
            alt="Add Image"
            width={24}
            height={24}
          />
        </div>
          <p className="p-14-medium">Click here to upload image</p>
      </div>
     )}
       </div>
  )}

   </CldUploadWidget>
  )
}

export default MediaUploader
