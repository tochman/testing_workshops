/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
    tests: './tests/unit'
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
