import { auth } from "@clerk/nextjs";
import { db } from "./db";

export const currenProfile = async () => {
     const {userId} = auth();

     if(!userId){
        return null;
     }

     const currentProfile = await db.profile.findFirst({
         where:{
           userId   
         }
     });

     return currentProfile;

}