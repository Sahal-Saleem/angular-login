import mongoose, { Document, Schema } from 'mongoose';

// Import the User interface
import { User } from './user';

// Define the user schema based on the User interface
const userSchema = new Schema<User & Document>({
    name: String , // Specify the type as an object
    email: String ,
    password: String ,
    image: String ,
});

// Create the User model
export const USER = mongoose.model<User & Document>('user', userSchema);
