import express from "express"
import paymentClass from "../Controller/PaymentController.js";

const paymentRouter = express.Router()
paymentRouter.post("/payment", paymentClass.Stripe);


export default paymentRouter