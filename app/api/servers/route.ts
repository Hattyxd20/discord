import { currenProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import {v4 as uuidV4} from "uuid"
import { ChannelType, MemberRole } from "@prisma/client";

import { NextResponse } from "next/server";


export async function POST(req :Request){
    try{
      const {name,imageUrl} = await req.json();
      const profile = await currenProfile();
      
      if(!profile){
         return new NextResponse("Unauthorized",{status:401});
      }
      
      const server = await db.server.create({
           data:{
             profileId:profile.id,
             name,
             imageUrl,
             inviteCode:uuidV4(),
             channels:{
               create:[
                 {
                   profileId:profile.id,
                   name:'general',
                   type:ChannelType.TEXT
                 }
               ]
             },
             members:{
                create:[
                  {
                     profileId:profile.id,
                     role:MemberRole.ADMIN
                  }
                ]
             }
             
           }
      })

      return NextResponse.json(server);
      
      
    }
    catch(error){
      console.log(error);
      return new NextResponse("Internal server error",{status:500})
    }
}