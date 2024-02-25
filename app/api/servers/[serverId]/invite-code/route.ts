import { currenProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import {v4 as uuid} from "uuid"
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{serverId:string}}){
     try{
       const profile = await currenProfile();
       if(!profile){
         return new NextResponse("Unauthorized",{status:400})
       }
       if(!params.serverId){
        return new NextResponse('Server ID missing',{status:400});
       }
       const server = await db.server.update({
          where:{
             id:params.serverId,
             profileId:profile.id,
          },
          data:{
             inviteCode:uuid(),
          }
       });

       return NextResponse.json(server);
     }

     

     catch(error){
        console.log(error);
        return new NextResponse("Internal server error",{status:500})
     }
}        