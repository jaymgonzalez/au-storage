const hre = require('hardhat')
const { keccak256, hexZeroPad, toUtf8Bytes } = hre.ethers.utils

const addr = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

async function main() {
  const value1 = await hre.ethers.provider.getStorageAt(addr, '0x0')

  console.log(`Value at storage position 0: ${parseInt(value1)}`)

  const value2 = await hre.ethers.provider.getStorageAt(addr, '0x1')

  console.log(`Value at storage position 1: ${parseInt(value2)}`)

  let key = hexZeroPad(84, 32)
  let baseSlot = hexZeroPad(0x2, 32).slice(2)
  let slot = keccak256(key + baseSlot)

  const valueMapping = await hre.ethers.provider.getStorageAt(addr, slot)

  console.log(`Value mapping at storage position 2: ${parseInt(valueMapping)}`)

  slot = keccak256(toUtf8Bytes('jaymgeth'))

  const arbitraryMapping = await hre.ethers.provider.getStorageAt(addr, slot)

  console.log(
    `Arbitrary mapping at storage position keccak256('jaymgeth'): ${parseInt(
      arbitraryMapping
    )}`
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
