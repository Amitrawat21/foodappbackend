import express from "express"
import {verifyToken , verifyTokenAdmin} from "../Middleware/VerifyToken.js"
import Productclass from    "../Controller/ProductController.js"


const productRouter = express.Router()


productRouter.post("/addProduct", verifyTokenAdmin , Productclass.createProduct  )
productRouter.get("/find/:id" , verifyToken , Productclass.getOneProduct)
productRouter.get("/" ,   Productclass.getAllProduct)



export default productRouter