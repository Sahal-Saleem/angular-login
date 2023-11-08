import {Request, Response} from "express"
import adminHelper from "../helpers/adminHelper";
import { User } from "../models/user";

export default{
    
  getAllUsers : async (req : Request, res : Response)=>{
    const users: User[] = await adminHelper.allUsers()
        res.status(200).json(users);
  },

  getSearch: (req:Request, res:Response)=>{
    console.log(req.query.searchKey); 
    if(req.query.searchKey){
        adminHelper.search(req.query.searchKey as string).then(
            (users)=>{
                res.status(200).json(users)
            }
        )
    }
}

     

 

    

    
}