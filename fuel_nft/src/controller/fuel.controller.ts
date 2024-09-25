import { Request, Response, NextFunction } from "express"
import { Provider, TESTNET_NETWORK_URL, Wallet, WalletUnlocked } from "fuels";
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
        nft.functions.set_metadata({ bits: req.body.assetIdBits }, req.body.metadataKey, { B256: req.body.metadataB256 })
        nft.functions.mint({ Address: { bits: req.body.address } }, req.body.subId, 1)
        res.status(200).send({
            nftAddress: contract.account?.address
        })

    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
}
