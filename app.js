import express from "express"
import cors from "cors"
import "./Connection/Connection.js"
import userrouter from "./Route/Route.js"
import dotenv from "dotenv"
import productRouter from "./Route/ProductRoute.js"
import uploadrouter from "./Route/UploadRoute.js"
import cartRouter from "./Route/CartRoute.js"
import paymentRouter from "./Route/PaymentRoute.js"
import Routorderer from "./Route/OrderRoute.js"
dotenv.config()
const app = express()
const port = process.env.PORT || 8000

app.use(cors())

app.use("/images", express.static('upload/images')); // Ensure this matches the multer destination
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/" ,(req, res)=>{
  res.json({message : "hellooo"})

})


app.use("/auth" , userrouter)
app.use("/product" , productRouter)
app.use( uploadrouter)
app.use("/cart" , cartRouter)
app.use(paymentRouter)

app.use(Routorderer)




app.listen(port , ()=>{
    console.log(`app is running on the port ${port}`)
})