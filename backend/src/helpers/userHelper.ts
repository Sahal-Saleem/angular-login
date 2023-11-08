import { USER } from "../models/userModel";
import { User } from "../models/user";
import mongoose from 'mongoose'; 
import bcrypt from "bcrypt"


export default{
    signUp : async(userData : User )=>{
        console.log('signUp');
        return new Promise <User | { signUpError : string }> (async ( resolve, reject)=>{
            const user : User | null = await USER.findOne({email : userData.email})
            if(user){
                console.log('user exist');
               resolve({signUpError:"User already exist !"}) ;
            }
            else{
               if (userData.password) {
                   userData.password = await bcrypt.hash(userData.password, 10);
                   await USER.create(userData).then((data)=>{
                       console.log('new user created',data);
                       resolve(data) 
                   })
                 }
            }
        })
    },

    logIn : async (userData : User) =>{
        return new Promise <User | { loginError: string }> (async (resolve , reject) =>{
            const { password, email } = userData;
            const user: User | null = await USER.findOne({ email: email });
            if (user?.password && password) {
                const passwordMatch = await bcrypt.compare(password, user.password); 
                if (passwordMatch) {
                    resolve(user) ;
                } else {
                    resolve({ loginError: "Password Not Match" }) ;
                }
            } else {
                resolve({ loginError: "User Not Found !" }) ;
            }
        })
    },

    edit : (userData : User ,image : string)=>{
        return new Promise(async (resolve, reject)=>{
            console.log(userData);
            let user = await USER.findOne({ email : userData.email })
            if(user){
                if(userData.password){
                    let a = await bcrypt.hash(userData.password,10);
                    console.log(a);
                    const user = new USER({
                        name : userData.name,
                        email : userData.email,
                        password : userData.password,
                        image : image
                    })
                    user.save()
                    .then((response) => {
                        resolve({name : userData.name, email : userData.email,image:image, _id : user._id})
                    }) 
                }else{
                    const user = new USER({
                        name : userData.name,
                        email : userData.email,
                        image : image
                    })
                    user.save()
                    .then((response) => {
                        resolve({name : userData.name, email : userData.email,image:image, _id : user._id})
                    }) 
                }
               
            }
            
        })
    },
    delete: (userId: string) => {
        return new Promise((resolve, reject) => {
            const objectId = new mongoose.Types.ObjectId(userId);                                                                                                                   
            USER.deleteOne({ _id: objectId }).then((response) => {
                resolve(response);
            });
        });
    },
}