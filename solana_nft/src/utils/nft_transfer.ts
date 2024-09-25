import { TokenStandard, transferV1 } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import wallet from "../wallet/wallet.json"
import { PublicKey, createSignerFromKeypair, signerIdentity } from '@metaplex-foundation/umi';

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(signer));

export async function transferNft(mint: PublicKey,newOwner: PublicKey) {
    await transferV1(umi, {
        mint,
        authority: signer,
        tokenOwner: signer.publicKey,
        destinationOwner: newOwner,
        tokenStandard: TokenStandard.NonFungible,
    }).sendAndConfirm(umi)
}