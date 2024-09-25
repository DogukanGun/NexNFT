import express from "express"
import solanaRouter from "./router/solana.router"


const app = express()
app.use(express.json())
app.use("/solana",solanaRouter)

export default app