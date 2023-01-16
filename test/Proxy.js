const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { assert } = require('chai')
const { ethers } = require('hardhat')

describe('Proxy', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const Proxy = await ethers.getContractFactory('Proxy')
    const proxy = await Proxy.deploy()

    const Logic1 = await ethers.getContractFactory('Logic1')
    const logic1 = await Logic1.deploy()

    const Logic2 = await ethers.getContractFactory('Logic2')
    const logic2 = await Logic2.deploy()

    const proxyAsLogic1 = await ethers.getContractAt('Logic1', proxy.address)
    const proxyAsLogic2 = await ethers.getContractAt('Logic2', proxy.address)

    return { proxy, logic1, logic2, proxyAsLogic1, proxyAsLogic2 }
  }

  async function lookupInt(contractAddr, slot) {
    return parseInt(await ethers.provider.getStorageAt(contractAddr, slot))
  }

  it('Should work with logic1', async function () {
    const { proxy, logic1, proxyAsLogic1 } = await loadFixture(deployFixture)

    // console.log(logic1)

    await proxy.changeImplementation(logic1.address)
    await proxyAsLogic1.changeX(3)
    assert.equal(await lookupInt(proxy.address, 0x0), 3)
  })

  it('Should work with upgrades', async function () {
    const { proxy, logic1, logic2, proxyAsLogic1, proxyAsLogic2 } =
      await loadFixture(deployFixture)

    assert.equal(await lookupInt(proxy.address, 0x0), 0)

    await proxy.changeImplementation(logic1.address)
    await proxyAsLogic1.changeX(4)

    assert.equal(await lookupInt(proxy.address, 0x0), 4)

    await proxy.changeImplementation(logic2.address)

    await proxyAsLogic2.changeX(50)
    await proxyAsLogic2.tripleX()

    // assert.equal(await lookupInt(proxy.address, 0x0), 50)

    assert.equal(await lookupInt(proxy.address, 0x0), 150)
  })
})
