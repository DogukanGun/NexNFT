import express from "express"
import * as fuelController from "../controller/fuel.controller";
const fuelRouter = express.Router()

fuelRouter.post("/nft",fuelController.createNFT)

export default fuelRouter;