require('@nomicfoundation/hardhat-toolbox')

module.exports = {
  solidity: '0.8.17',
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      blockGasLimit: 5000000,
    },
  },
}
