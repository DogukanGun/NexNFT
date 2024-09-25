import wallet from "../wallet/wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr"
import { readFile } from "fs/promises";

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');
const bundlrUploader = createBundlrUploader(umi);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

export async function uploadNftImage(base64Image:string):Promise<string>{
    try {
        let content = Buffer.from(base64Image, 'base64');
        const image = createGenericFile(content,"Generug",{
            contentType:"image/png"
        })

        const [myUri] = await bundlrUploader.upload([image])
        console.log("Your image URI: ", myUri);
        return myUri
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
        return ""
    }
}