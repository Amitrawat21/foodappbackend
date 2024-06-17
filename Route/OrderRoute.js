import express from "express"
import OrderClass from "../Controller/OrderController.js"
import Order from "../Model/OrderSchema.js"
const Routorderer = express.Router()


Routorderer.post("/addOrder" , OrderClass.addOrder)
Routorderer.get("/:email" , OrderClass.getAll)
Routorderer.delete("/delete/:id" , OrderClass.deleteOrder)


export default Routorderer