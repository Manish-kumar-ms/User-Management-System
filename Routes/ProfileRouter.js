
import express from 'express'
import { ensureAuthentication } from '../Middlewares/Authentication.js'
import {  profileregister,profileupdate } from '../Controller/Profilecontroller.js'


const router=express.Router()


router.post("/registerProfile",ensureAuthentication,profileregister)
router.put("/updateProfile",ensureAuthentication,profileupdate)


export default router