import { currenProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

interface InviteCodePagProps{
    params:{
      inviteCode:string;
    };
};

const InviteCodePage = async ({
  params
} : InviteCodePagProps) => {
    const profile = await currenProfile();

    if(!profile){
      return redirectToSignIn();
    }

    if(!params.inviteCode){
        return redirect('/');
    }

    const exisitingServer = await db.server.findFirst({
        where:{
          inviteCode:params.inviteCode,
          members:{
             some:{
               profileId:profile.id
             }
          }
          
        }
    });


    if(exisitingServer){
       return redirect(`/servers/${exisitingServer.id}`)
    }

    const server = await db.server.update({
        where:{
          inviteCode:params.inviteCode
        },
        data:{
          members:{
            create:{
              profileId:profile.id,

            }
          }
        }
    });
    
    if(server){
      return redirect(`/servers/${server.id}`)
    }
}

export default InviteCodePage