import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';


const userSchema = new Schema<TUser>({
    id:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    needPasswordChange:{
        type:Boolean,
        default:true,
    },
    role:{
        type:String,
        enum:['student','admin','faculty',]
    },
    status:{
        type:String,
        enum:['in-progress','blocked'],
        default:'in-progress'
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true,
});


userSchema.pre('save', async function (next) {
    // console.log(this, 'pre hook');
    // hsssing and save into db
  
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    const bcryptValidation = config.bcrypt;
    user.password = await bcrypt.hash(user.password, Number(bcryptValidation));
    next();
  });
  
  // post save middleware function
  
  userSchema.post('save', function (doc, next) {
    doc.password = '';
    // console.log(this, 'post hook');
    next();
  });
export const User = model<TUser>('user',userSchema);