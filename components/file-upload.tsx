"use client"
import React from 'react'
import { UploadDropzone } from '@/lib/uploadThing';
import "@uploadthing/react/styles.css"
import Image from 'next/image';
import { FileIcon, X } from 'lucide-react';




interface FileUploadProps{
   endpoint : 'serverImage' | "messageFile";
   value:string;
   onChange:(url : string) => void;
}

const FileUpload = ({
  endpoint,
  value,
  onChange
} : FileUploadProps) => {
  
  const fileType = value?.split('.').pop();

  if(value && fileType !== 'pdf'){
      return (
         <div className='relative h-20 w-20'>
            <Image
              fill
              src={value}
              alt='Upload'
              className='rounded-full'
            />
            <button
              onClick={() => onChange("")}
              className='rounded-full bg-rose-500 text-white p-1 absolute top-0 right-0 shadow-sm'
              type='button'
            >
               <X className='h-4 w-4'/>
            </button>
         </div>
      )
  }
     
   
  if(value && fileType === "pdf"){
     return (
       <div className='relative flex items-center mt-2 p-2 rounded-md bg-background/10'>
          <FileIcon className='w-10 h-10 fill-indigo-200 stroke-indigo-400'/>
          <a 
            href="value"
            target='_blank'
            rel='noopener noreferrer'
            className='ml-2 text-sm text-indigo-500 darl:text-indigo-400 hover:underline'
          >
            
             {value}
          </a>
          <button
              onClick={() => onChange("")}
              className='rounded-full bg-rose-500 text-white p-1 absolute -top-2 -right-2 shadow-sm'
              type='button'
            >
               <X className='h-4 w-4'/>
           </button>
       </div>
     )
  }

  return (
     <UploadDropzone
       endpoint={endpoint}
       onClientUploadComplete={(res) => {
         onChange(res?.[0].url)
         
       }}
       onUploadError={(error : Error) => [
          console.log(error)
       ]}
     />
  )
}

export default FileUpload;
