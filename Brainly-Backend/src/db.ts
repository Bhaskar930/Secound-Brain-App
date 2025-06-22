import mongoose, { model,Schema} from "mongoose";
import { string } from "zod";

mongoose.connect("mongodb+srv://negibhaskar19:qfZMNMgr9o4xxd42@cluster0.v22ik.mongodb.net/Secound-Brain-App")
.then(()=>{
    console.log("DataBase Connected Successfully")
}).catch((error)=>{
    console.log("DataBase Connection Failed",error)
})
const UserSchema=new Schema({
    username:{type:String,unique:true},
    password:String
}) 




export const userModel=model("User",UserSchema);

const ContentSchema=new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true},
    type:String
    //  sharedLinks: [
    //     {
    //         sharedLink: { type: String, required: true },
    //         permissions: { type: String, enum: ['view', 'edit'], default: 'view' },
    //         createdAt: { type: Date, default: Date.now }
    //     }
    // ]


})

export const ContentModel=model("Content",ContentSchema);


const LinkSchema=new Schema({
   
    hash:String,
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true,
    unique:true}



})
export const LinkModel=model("Links",LinkSchema);


