import type { NextApiRequest,  NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res:NextApiResponse ){
    if(req.method === 'POST'){
        //process request by POST
    }
    else{
        //process request by other
    }
}