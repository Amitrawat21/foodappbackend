import express from "express"
import Userclass from "../Controller/UserController.js"


const userrouter = express.Router()


userrouter.post("/register" , Userclass.Registration)
userrouter.post("/login" , Userclass.login)





export default userrouter