
import userAdminModel from "../Models/userAdmin.js"
import profileModel from "../Models/userprofile.js"

export const profileregister=async(req,res)=>{
    try {
        const {name,mobileNo,bio,availabilityTime }=req.body
        const userId=req.user._id

           // check any field is empty or not
        if(!name || !mobileNo || !bio || !availabilityTime){
            return res.status(400)
            .json({
               message:"please fill all the fields "
            })
        }

        // Validate availabilityTime format

        for(const slots of availabilityTime){
            if(!slots.start || !slots.end){
                return res.status(400).json({
                    message: "Each availability time slot must have 'start' and 'end' times",
                    success: false
                });
            }
        }

        const user= await profileModel.findOne({userId}) // find the user with ID
           
        if(user){
            return res.status(400)
            .json({message:"you already made a profile",
                success:false
            })
        }
         
        // check the role who register the profile
        const findrole= await userAdminModel.findOne({ _id:userId})
       
         
        // create a profile 
        const newProfile =  await profileModel.create({
            userId,name,mobileNo,bio,availabilityTime
       })
       console.log(newProfile)

       return res.status(201).json({
        message: "Profile created successfully",
        success: true,
        profile: newProfile 
    });

        
    } catch (error) {
        console.log(error)
        return res.status(400)
        .json({message:"there is some problem on registartion on profile",
            success: false
        })
    }
}




export const profileupdate= async(req,res)=>{
try {
    
    const userId = req.user._id; 
    const existingProfile = await profileModel.findOne({ userId });

    if (!existingProfile) {
        return res.status(404).json({
            message: "Profile not found",
            success: false
        });
    }

    const updatedProfile=await profileModel.findOneAndUpdate(
        {userId},
        {$set:req.body}, //update  the provided fields
        {new:true}
    )
    
    return res.status(200).json({
        message: "Profile updated successfully",
        success: true,
        profile: updatedProfile
    });



} catch (error) {
    console.error(error);
        return res.status(400).json({
            message: "Server error while updating profile",
            success: false
        });
}
}