
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {currenProfile} from "@/lib/currentProfile"
import { db } from "@/lib/db"
import NavigationAction from "./NavigationAction";
import NavigationItem from "./NavigationItem";
import { ScrollArea } from "@/components/ui/scroll-area";


 const NavigationSidebar = async () => {
  const profile = await currenProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  return (
    <div
      className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3"
    >
       <NavigationAction/>
       <Separator
         className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
       />
       <ScrollArea className="w-full flex-1">
           {servers.map((server) => (
               <div
                className="mb-4"
                key={server.id}
                
               >
                  <NavigationItem
                    id={server.id}
                    name={server.name}
                    imageUrl={server.imageUrl}
                  />
               </div>
           ))}
       </ScrollArea>
       <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
          <ModeToggle/>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements:{
                avatarBox:'w-[48px] h-[48px]'
              }
            }}
          />
       </div>
       
    </div>
  )
}

export default NavigationSidebar;

