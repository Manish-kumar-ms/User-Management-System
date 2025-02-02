import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

const mongo_url = process.env.MONGODB_URL;


export const connectDb=()=>{
    mongoose.connect(mongo_url)
    .then(()=>{
        console.log("mongodb connect");
    })
    .catch((err) => {
        console.log(err);
      });
}