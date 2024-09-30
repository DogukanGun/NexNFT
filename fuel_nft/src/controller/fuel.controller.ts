import { Request, Response, NextFunction } from "express"
import { Address, Provider, TESTNET_NETWORK_URL, Wallet, WalletUnlocked, bn } from "fuels";
import { NFTContract, NFTContractFactory } from "../../types";

export const createNFT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const privateKey = process.env.PRIVATE_KEY!;

        const provider = await Provider.create(TESTNET_NETWORK_URL);
        const myWallet: WalletUnlocked = Wallet.fromPrivateKey(privateKey, provider);
        const factory = new NFTContractFactory(myWallet);
        // Deploy the contract
        const { waitForResult, contractId, waitForTransactionId } = await factory.deploy();
        const transactionId = await waitForTransactionId();
        const { contract, transactionResult } = await waitForResult();

        if (transactionResult.isStatusFailure) {
            res.sendStatus(500)
        }
        const nft = new NFTContract(contractId, provider)
        const recipient = { Address: { bits: Address.fromPublicKey(req.body.receiver).toB256() } };

        const callResult = await nft.functions
            .mint(recipient, nft.id.toString(), bn(1))
            .call();
        const result = await callResult.waitForResult()
        res.status(200).send({
            nftAddress: result.program.account?.address
        })

    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
}
