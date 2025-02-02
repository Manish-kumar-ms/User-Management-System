import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
        
    },
    email:{
        type:String,
        required :true,
       
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum: ["User", "Admin"], // Ensures role is either 'user' or 'admin'
       
    }
})

 const userAdminModel=mongoose.model('usersAdmin',userSchema)
 export default userAdminModel