import {Request, Response} from "express"
import userHelper from "../helpers/userHelper"
import { User } from "../models/user"
import { fileReq, headerReq } from "../models/reqModel"
import jwt from "../middlewares/jwt"


export default{
    
    getUser : (req : Request, res : Response)=>{
        console.log('getuser controller');
        let user : User | string = jwt.getUserFromToken( req as headerReq)
        console.log('getUser',user);
        let date = new Date()
        console.log(date.getMilliseconds());
        res.status(200).json(user)
    },




    postSignUp  : async (req : Request , res : Response)=>{
        console.log('postSignUp');
        userHelper.signUp(req.body).then((response : User | { signUpError : string })=>{
            if(response && 'signUpError' in response){
                res.status(401).json(response.signUpError)
            }else if (response){
                console.log('success');
                
                const token = jwt.createUserToken(response)
                
                res.status(200).cookie("jwt",token,{
                    httpOnly: true,
                    maxAge : 24*60*60*1000
                }).json([response,token])
            }
        }).catch(()=>{
            res.send('Failed')
        })
    },

    postLogIn : async (req : Request , res : Response)=>{
        userHelper.logIn(req.body).then((response : User | { loginError: string }) => {
            if (response && 'loginError' in response) {
                res.status(401).json(response.loginError);
            } else  {
                const token = jwt.createUserToken(response)
                res.status(200).json([response,token])
            }
        }).catch(() => {
            res.send('Failed');
        });
    },

    postEdit : async (req : Request , res : Response)=>{
        let image = (req as fileReq).files[0].filename
        console.log(image);
        userHelper.edit(req.body, image).then((response : any)=>{
            const token = jwt.createUserToken(response)
            console.log('done',token);
            res.status(200).json(token)
        })
    },

    postDelete: (req: Request, res: Response) => {
        console.log(req.body);
        userHelper.delete(req.body.id).then((response) => {
            res.status(200).json(response)
        })
    },

    // getData:(req:Request, res:Response)=>{
    //     console.log(req.body.user,"get data");
        
    // }

    
}

