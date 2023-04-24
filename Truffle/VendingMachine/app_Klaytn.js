const contractInfo = require("./VendingMachine.json");
const Caver = require("caver-js");

const cav = new Caver("https://api.baobab.klaytn.net:8651");

const abi = contractInfo.abi;
const address = contractInfo.address;

const smartContract = new cav.klay.Contract(abi, address);
// console.log(smartContract);
// console.log(cav);

// 인자로 address, private key
const account = cav.klay.accounts.createWithAccountKey(
    process.env.KLAYTN_ADDRESS,
    process.env.KLAYTN_PRIVATE
);
const wallet = cav.klay.account.wallet.add(account);

async function getDonuts() {
    let donutNumbers = await smartContract.methods
        .getVendingMachineBalance()
        .call();
    console.log(donutNumbers);
}
getDonuts();

const donutPurchase = async (amount)=> {
    receipt = await smartContract.methods.purchase(amount).send({
        from:account.address,
        gas:200000
    })
    console.log(receipt)
}
​
​
const donutRestock = async (amount)=> {
    
    receipt = await smartContract.methods.restock(amount).send({
        from:account.address,
        gas:200000
    })
    console.log(receipt)
}
​