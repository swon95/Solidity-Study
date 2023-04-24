require('dotenv').config();
const abiJson = require("./VendingMahchine.json")
const contractAbi = require("./vendingMachine.js")
// const abi = process.env.ABI
const abi =abiJson.abi
const address = abiJson.address
// const abi = contractAbi.ABI.abi
// const what = contractAbi.a.머지
// console.log(what)
​
const Web3 = require("web3")
const web3 =new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")) 
// console.log(web3)
const smartContract  = new web3.eth.Contract(abi , address)
// smartContract.methods.getVendingMachineBalance().call()
// .then(function(result){
//     console.log(result)
// })
​

​async function getDonuts() {
    let donutNumbers = await smartContract.methods.getVendingMachineBalance().call()
    console.log(donutNumbers)
}


const donutPurchase = async (amount)=> {
    accounts = await web3.eth.getAccounts();
    balance = await web3.utils.toWei('0.02', 'ether')
    receipt = await smartContract.methods.purchase(amount).send({
        from:accounts[0],
        gas:200000
    })
    console.log(receipt)
}


const donutRestock = async (amount)=> {
    accounts = await web3.eth.getAccounts();
    balance = await web3.utils.toWei('0.02', 'ether')
    receipt = await smartContract.methods.restock(amount).send({
        from:accounts[0],
        gas:200000
    })
    console.log(receipt)
}

// donutPurchase(100)
// getDonuts()
// donutRestock(100)

// donutPurchase(100)
// .then((receipt)=>{
//      getDonuts()
//      console.log(receipt)
// })