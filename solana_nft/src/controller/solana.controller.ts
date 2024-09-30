import { Request, Response, NextFunction } from "express"
import { uploadNftImage } from "../utils/nft_image";
import { setNftMetadata } from "../utils/nft_metadata";
import { mintNft } from "../utils/nft_mint";
import { transferNft } from "../utils/nft_transfer";
import { publicKey } from '@metaplex-foundation/umi';



export const createNFT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //Upload image 
        const imageUri = await uploadNftImage(req.body.image)
        console.log("Image URI: " + imageUri)
        const metadataUri = await setNftMetadata(req.body.name,req.body.symbol,req.body.description,imageUri)
        console.log("Metadata URI: " + metadataUri)
        const mint = await mintNft(req.body.name,req.body.symbol,metadataUri,publicKey(req.body.receiver))
        console.log("Mint address: "+mint)
        //await transferNft(mint.publicKey,publicKey(req.body.receiver))
        res.status(200).send({pubkey:mint.publicKey})
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
}
