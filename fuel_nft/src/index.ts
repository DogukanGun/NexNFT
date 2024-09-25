import express from "express"
import fuelRouter from "./router/fuel.router"


const app = express()
app.use(express.json())
app.use("/fuel",fuelRouter)

export default app