import express from 'express'
import { ensureAuthentication } from '../Middlewares/Authentication.js'
import { sendNotification } from '../Controller/sendNotification.js'
const router=express.Router()

router.post("/sendNotification",ensureAuthentication,sendNotification)

export default router