const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => { //Utility function to ^18 random number
    return ethers.utils.parseUnits(n.toString(), 'ether') 
}

describe('Token', () => {
    let token, accounts, deployer, receiver

    beforeEach(async () => {
        //Fetch Token from Blockchain
        const Token = await ethers.getContractFactory('Token') //This variable is the undeployed contract
        token = await Token.deploy('Dapp University', 'DAPP', '1000000') //Here we deploy it and assign to a variable. Deploy runs the constructor, so we can pass args to constructor here. 
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        receiver = accounts[1]
    })

    describe('Deployment', () => {
        const name = 'Dapp University'
        const symbol = 'DAPP'
        const decimals = 18;
        const totalSupply = tokens('1000000');

        it('has correct name', async () => {
            expect(await token.name()).to.equal(name)
        })
        it('has correct symbol', async () => {
            expect(await token.symbol()).to.equal(symbol)
        })
        it('has correct decimals', async () => {
            expect(await token.decimals()).to.equal(decimals)
        })
        it('has correct total supply', async () => {
            expect(await token.totalSupply()).to.equal(totalSupply)
        })
        it('assigns total supply to deployer', async () => {
            expect(await token.balanceOf(deployer.address)).to.equal(totalSupply)
        })
    })
    describe('Sending Token', () => {
        let amount, transaction, result
    
        describe('Success', () => {
            beforeEach(async () => {
                amount = tokens(100)
                transaction = await token.connect(deployer).transfer(receiver.address, amount)
                result = await transaction.wait()
            })
    
            it('transfers token balances', async () => {
                // Log balance before transfer
                //console.log('deployer balance before transfer', ethers.utils.formatEther(await token.balanceOf(deployer.address)))
                //console.log("receiver balance before transfer", ethers.utils.formatEther(await token.balanceOf(receiver.address)))
                //Transfer tokens
                expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
                expect(await token.balanceOf(receiver.address)).to.equal(amount) 
            })
            it('emits a Transfer Event', async () => {
                const event = result.events[0]
                expect(event.event).to.equal('Transfer')
                
                const args = event.args
                expect(args.from).to.equal(deployer.address)
                expect(args.to).to.equal(receiver.address)
                expect(args.value).to.equal(amount)
            })
        })
        describe('Failure', () => {
            it('rejects insufficient balances', async () => {
                //Transfer more tokens than deployer has
                const invalidAmount = tokens(9999999999999)
                await expect(token.connect(deployer).transfer(receiver.address, invalidAmount)).to.be.reverted
            })
            it('rejects invalid recipient', async () => {
                const amount = tokens(100)
                await expect(token.connect(deployer).transfer('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
            })
        })  
    })
})