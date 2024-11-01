import mongoose from "mongoose";

const exerciseSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        load:{
            type:String,
            required:true,
        },
        reps:{
            type:Number,
            required:true,
        },
    },
    {
        timestamps:true,
    }
)

export const Exercise = mongoose.model('new', exerciseSchema);