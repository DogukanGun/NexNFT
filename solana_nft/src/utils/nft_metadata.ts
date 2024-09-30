import wallet from "../wallet/wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');
const bundlrUploader = createBundlrUploader(umi);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

export async function setNftMetadata(name:string,symbol:string,description:string,image:string):Promise<string>{
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const metadata = {
            name: name,
            symbol: symbol,
            description: description,
            image,
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: [
                {
                    "address": process.env.pubkey!,
                    "share": 100
                }
            ]
        };
        const myUri = await bundlrUploader.uploadJson(metadata)
        console.log("Your image URI: ", myUri);
        return myUri
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
        return ""
    }
}