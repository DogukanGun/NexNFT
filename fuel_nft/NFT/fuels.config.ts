import { createConfig } from 'fuels';

export default createConfig({
  contracts: [
        'NFT-contract/Cargo.toml',
  ],
  output: './src/sway-contracts-api',
});

/**
 * Check the docs:
 * https://docs.fuel.network/docs/fuels-ts/fuels-cli/config-file/
 */
