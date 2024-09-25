/* Autogenerated file. Do not edit manually. */

/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */

/*
  Fuels version: 0.94.2
*/

import { ContractFactory, decompressBytecode } from "fuels";
import type { Provider, Account, DeployContractOptions, DeployContractResult } from "fuels";

import { NFTContract } from "./NFTContract";

const bytecode = decompressBytecode("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");

export class NFTContractFactory extends ContractFactory {

  static readonly bytecode = bytecode;

  constructor(accountOrProvider: Account | Provider) {
    super(bytecode, NFTContract.abi, accountOrProvider);
  }

  static async deploy (
    wallet: Account,
    options: DeployContractOptions = {}
  ): Promise<DeployContractResult<NFTContract>> {
    const factory = new NFTContractFactory(wallet);

    return factory.deploy({
      storageSlots: NFTContract.storageSlots,
      ...options,
    });
  }
}
