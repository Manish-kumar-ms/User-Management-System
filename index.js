import bodyParser from "body-parser";
import AuthRouter from "./Routes/AuthRouter.js"
import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors'
import { connectDb } from "./Models/db.js";

import ProfilRouter from "./Routes/ProfileRouter.js"
import  NotificationRouter from  "./Routes/NotificationRouter.js"
import { startNotificationScheduler } from "./utils/notificationScheduler.js";

dotenv.config()
const app=express();
const PORT=process.env.PORT || 8080

app.use(bodyParser.json())
app.use(cors())

app.use('/auth',AuthRouter)
app.use('/profile',ProfilRouter)
app.use('/notification',NotificationRouter)

app.get('/',(req,res)=>{
    res.send('PONG')
})

app.listen(PORT,()=>{
    connectDb();
    startNotificationScheduler()
    console.log(`server is running at ${PORT}`)
})