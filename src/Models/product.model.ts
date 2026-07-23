import { timeStamp } from "node:console";
import { boolean, maxLength, minLength } from "zod";
import ImageSchema from "./image.model";
import { required } from "zod/mini";
import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        minLength:3,
        maxLength:200,

    },
    description:{
        type:String,
        minLength:50,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    //brand:werc2344fdf244
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"brand",
        required:[true,"brand is required"],
    },
    
    cover_image:{
        type:ImageSchema,
        required:[true,"cover_image is required"],
    },
    images:{
        type:ImageSchema,
        default:null,
    },
    is_featured:{
        type:Boolean,
        default:false,
    },
    new_arrival:{
        type:Boolean,
        default:true,
    },
    {timestamps:true},
})