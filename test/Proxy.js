const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { assert } = require('chai')

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

    return { proxy, logic1, logic2 }
  }

  it('Should work with logic1', async function () {
    const { proxy, logic1 } = await loadFixture(deployFixture)

    // console.log(logic1)

    await logic1.changeX(3)
    await proxy.changeImplementation(logic1.address)
    assert.equal(await logic1.x(), 3)
  })

  it('Should work with upgrades', async function () {
    const { proxy, logic1, logic2 } = await loadFixture(deployFixture)

    // console.log(logic1)

    await logic1.changeX(3)
    await proxy.changeImplementation(logic1.address)
    assert.equal(await logic1.x(), 3)

    await proxy.changeImplementation(logic2.address)
    await logic2.changeX(3)
    assert.equal(await logic2.x(), 6)
  })
})