import mongoose from "mongoose";


const profileSchema=new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usersAdmin", // Referencing the UserAdmin model
        required: true
    },

    name:{
        type:String,
        required:true
        
    },
    mobileNo:{
        type:Number,
        required :true,
         unique:true
    },
    bio:{
        type:String,
        required:true,
    },
    availabilityTime:[
        {
            start:String,
            end:String
        }
    ]  
},{ timestamps: true })

const profileModel=mongoose.model('profile',profileSchema)
export default profileModel