import { getAuth } from "@clerk/nextjs/server";
import { db } from "./db";
import { NextApiRequest } from "next";

export const currenProfilePages = async (req : NextApiRequest) => {
     const {userId} = getAuth(req);

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