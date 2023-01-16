const hre = require('hardhat')
const { keccak256, hexZeroPad } = hre.ethers.utils

const addr = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

async function main() {
  const value1 = await hre.ethers.provider.getStorageAt(addr, '0x0')

  console.log(`Value at storage position 0: ${parseInt(value1)}`)

  const value2 = await hre.ethers.provider.getStorageAt(addr, '0x1')

  console.log(`Value at storage position 1: ${parseInt(value2)}`)

  const key = hexZeroPad(84, 32)
  const baseSlot = hexZeroPad(0x2, 32).slice(2)
  const slot = keccak256(key + baseSlot)

  const valueMapping = await hre.ethers.provider.getStorageAt(addr, slot)

  console.log(`Value mapping at storage position 2: ${parseInt(valueMapping)}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
