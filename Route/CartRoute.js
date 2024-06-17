import express from "express"
import userCartSchema from "../Controller/AddcartController.js"

const cartRouter = express.Router()

cartRouter.post("/addToCart" , userCartSchema.addToCart)
cartRouter.get("/getData/:email" , userCartSchema.getCartData)
cartRouter.post("/:id" , userCartSchema.removeCartProduct)
cartRouter.delete("/deleteAllCart/:id" , userCartSchema.removeAllCart)


export default cartRouter