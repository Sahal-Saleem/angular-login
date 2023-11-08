import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { headerReq } from '../models/reqModel'

const secret = "7dG9pK2sR5yW8vT1zN0xM3lA"

export default {
    createUserToken : (user: User) => {
        const payload : User ={
            _id: user._id,
            name : user.name,
            email : user.email,
            password : user.password,
            image : user.image
        }
        const options = { expiresIn: '1hr' }
        return jwt.sign(payload,secret,options)
    },

    getUserFromToken : (req : headerReq) : User | string =>{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return "Authorization header not found";
        }
        const token = authHeader.split(" ")[1];
        if(!token) {
            return "Token not found";
        }

        try{
            const decoded = jwt.verify(token, secret);
            req.user = decoded;
            return req.user
        } catch (error) {
            return "Invalid token";
        }

    }
}