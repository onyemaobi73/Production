import mongoose from "mongoose";

interface iAuth {
    userName?: string;
    email?: string;
    passsword?: string;
    avatar?: string;
}

interface iAuthData extends iAuth,  mongoose.Document {}

const authModel =  new mongoose.Schema({
    userName: {
        type:String,
        trim: true,
    },
    email: {
        type:String,
        trim:true,
        required: true,
        unique: true
    },
    passsword: {
        type:String,
        min:6,
    },
    avatar: {
        type: String
    },
},
 {timestamps: true},
);

export default mongoose.model<iAuthData>("auths", authModel);