import { USER } from "../models/userModel";
import { User } from "../models/user";

export default{
    allUsers: (): Promise<User[]> => {
        return new Promise(async (resolve, reject) => {
            let users: User[] = await USER.find({})
            resolve(users)
        })
    },

    search: (text: string)=>{
        console.log(text);
        return new Promise(async(resolve,reject)=>{
            let regex = new RegExp(text, "i");
            let users = await USER.find({
                $or: [
                    { name: { $regex: regex } },
                    { email: { $regex: regex } },
                    { address: { $regex: regex } },
                    { mobile: { $regex: regex } }
                ]
            })
            console.log(users);
            
            resolve(users)
        })
    }
}
