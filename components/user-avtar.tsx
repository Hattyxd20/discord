import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import React from 'react'


interface UserAvtarProps{
    src?:string;
    className?:string;
}

const UserAvtar = ({
   src,
   className
} : UserAvtarProps) => {
  return (
     <div>
       <Avatar
         className={cn(
            `h-7 w-7 md:h-10 md:w-10`,
            className
         )}
       >
         <AvatarImage
           src={src}
         />
       </Avatar>
     </div>
  )
}

export default UserAvtar;