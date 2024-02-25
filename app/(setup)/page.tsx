import { intitialProfile } from "@/lib/initialProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import InitialModal from "@/components/modals/InitialModal";

const setUpPage = async () => {
    const profile = await intitialProfile();
    console.log("profile here",profile);
    
    

    const server = await db.server.findFirst({
         where:{
           members:{
             some:{
               profileId:profile.id 
             }
           }
         }
    })
    
    if(server){
      return redirect(`/servers/${server.id}`)
    }
   
    return <InitialModal/>
}

export default setUpPage;
