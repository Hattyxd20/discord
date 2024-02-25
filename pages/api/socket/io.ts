import {Server as NetServer} from 'http'
import { NextApiRequest } from 'next'
import {Server as ServerIO} from "socket.io"
import { NextApiResponseServerIo } from '@/types'
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'

export const config = {
    api:{
      bodyParser:false,
    },
}

const ioHandeler = (req : NextApiRequest,res:NextApiResponseServerIo) => {
     if(!res.socket.server.io){
       const path = "/api/socket/io"
       const httpServer : NetServer = res.socket.server as any
       const io = new ServerIO(httpServer,{
          path:path,
          addTrailingSlash:false
       })
       res.socket.server.io = io;
     }

     res.end();
}


export default ioHandeler;

