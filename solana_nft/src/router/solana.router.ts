import express from "express"
import * as solanaController from "../controller/solana.controller";
const solanaRouter = express.Router()

solanaRouter.post("/nft",solanaController.createNFT)

export default solanaRouter;