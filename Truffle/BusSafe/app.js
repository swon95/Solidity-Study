// require("dotenv").config();
// const contractInfo = require("./BusSafe.json");

// const abi = contractInfo.abi;
// const address = contractInfo.address;

// const Web3 = require("web3");
// const mysql = require("mysql");
// const mongoDBClass = require("./utils");

// const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
// // console.log(web3);
// const smartContract = new web3.eth.Contract(abi, address);

// // console.log(smartContract.events.allEvents());
// // web3.eth.getBlock().then((result) => {
// //     result;
// // });

// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "a1231234!",
//     database: "bussafe",
// });

// // connection.connect();
// // connection.connect(function (err) {
// //     if (err) throw err;
// //     console.log("Connection !");
// // });
// // 종료
// // connection.end();

// // 에러 예외처리
// var sql = "select * from checkres";
// connection.query(sql, function (err, rows, fields) {
//     if (err) {
//         console.error("error connecting: " + err.stack);
//     }
//     for (i = 0; i < rows.length; i++) {
//         console.log(rows[i].returnValues);
//     }
// });
// connection.end();

// // 함수의 재사용을 위해 매개변수 사용
// const addCheck = async (carId, res, etc, date) => {
//     accounts = await web3.eth.getAccounts();

//     receipt = await smartContract.methods
//         .AddCheckList(carId, res, etc, date)
//         .send({
//             from: accounts[1],
//             gas: 200000,
//         });

//     // connection.connect();
//     await connection.connect(function (err) {
//         if (err) throw err;
//         console.log("Connected!");
//     });
//     var sql =
//         // "INSERT INTO checkres (address, blockNumber, returnValues) VALUES ( ?, ?, ?);";
//         `INSERT INTO checkres (address, blockNumber, returnValues) VALUES (${address}, ${blockNumber}, ${returnValues});`;
//     var address = receipt.events.AddCheck.address;
//     var blockNumber = receipt.events.AddCheck.blockNumber;
//     var returnValues = receipt.events.AddCheck.returnValues;

//     addCheck;
//     // insert
//     connection.query(
//         sql,
//         // 배열을 2 번째 인자로
//         [address, blockNumber, returnValues],
//         // results 에 쿼리 결과 저장
//         function (error, results, fields) {
//             if (error) throw error;
//             console.log("Insert Success");
//             console.log(results);
//             // 종료
//             connection.end();
//         }
//     );
//     await mongoDBClass.check_res(address, blockNumber, returnValues);
//     // console.log(receipt.events)
// };

// // const addCheck = async (id, res, etc, time) => {
// //     accounts = await web3.eth.getAccounts();
// //     receipt = await smartContract.methods
// //         .AddCheckList(id, res, etc, time)
// //         .send({
// //             from: accounts[0],
// //             gas: 200000,
// //         });
// //     connection.connect(function (err) {
// //         if (err) throw err;
// //         console.log("Connection !");
// //     });

// //     val sql = 'INSERT INTO MEMBER VALUES (address, blockNumber, returnValues);'
// //     connection.query(sql, [])
// //     // console.log(receipt);
// //     console.log(receipt.events.addCheck.returnValues);
// // };

// // // 배열의 개수 가져오기
// // async function checkListNumber() {
// //     let Number = await smartContract.methods.TotalCount().call();
// //     // console.log(Number);
// // }

// // async function getCheck(index) {
// //     let Result = await smartContract.methods.GetCheck(index).call();
// //     // console.log(Result);
// // }

// // async function getEvents() {
// //     result = await smartContract.getPastEvents(
// //         "AddCheck",
// //         {
// //             filter: [1],
// //             fromBlock: 0,
// //             tooBlock: "latest",
// //         },
// //         function (err, events) {
// //             // console.log(events);
// //         }
// //     );
// // }

// // 블록체인에 저장
// // // getEvents();

// // // myContract.getPastEvents('MyEvent', {
// // //     filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
// // //     fromBlock: 0,
// // //     toBlock: 'latest'
// // // }, function(error, events){ console.log(events); })
// // // .then(function(events){
// // //     console.log(events) // same results as the optional callback above
// // // });
// // // console.log(process.env.ADDRESS);

// // // addCheck("서울2", "ㄱㄱㅇ", "ㅅㄱㅇ", 123456);

// // // checkListNumber();
// // // getCheck(1);

require("dotenv").config();
const contractInfo = require("./BusSafe.json");

const abi = contractInfo.abi;
const address = contractInfo.address;

const Web3 = require("web3");
const mysql = require("mysql");
const mongoDBClass = require("./utils");

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
// console.log(web3)
const smartContract = new web3.eth.Contract(abi, address);
// console.log(smartContract.events.allEvents())
// web3.eth.getBlock()
// .then(result=>{
//     console.log(result)
// })

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "a1231234!",
    database: "bussafe",
});

// connection.end();

// var sql = 'select * from checkres'
// connection.query(sql, function(err, rows, fields)
//   {
//       if (err) {
//           console.error('error connecting: ' + err.stack);
//       }

//       for (let i=0;i<rows.length;i++) {
//         console.log(rows[i].returnValues);
//       }

//   });
const addCheck = async (carId, res, etc, date) => {
    accounts = await web3.eth.getAccounts();

    receipt = await smartContract.methods
        .AddCheckList(carId, res, etc, date)
        .send({
            from: accounts[1],
            gas: 200000,
        });
    var address = receipt.events.AddCheck.address;
    var blockNumber = receipt.events.AddCheck.blockNumber;

    var returnValues = receipt.events.AddCheck.returnValues;
    console.log(receipt.events.AddCheck.returnValues);
    // connection.connect();
    await connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO checkres (address, blockNumber, returnValues) VALUES (?, ?, ?);`;

        connection.query(
            sql,
            [address, blockNumber, JSON.stringify(returnValues)],
            function (error, results, fields) {
                if (error) throw error;
                console.log("Insert Success");
                console.log(results);
                connection.end();
            }
        );
    });

    var blockHash = receipt.events.AddCheck.blockHash;

    await mongoDBClass.check_res(address, blockNumber, returnValues);
    await mongoDBClass.check_detail(
        carId,
        blockNumber,
        blockHash,
        "이상없음",
        "이상없음",
        "이상없음",
        "이상없음",
        "이상없음"
    );
    // console.log(receipt.events)
};

async function checkListNumer() {
    let number = await smartContract.methods.TotalCount().call();
    console.log(number);
}

async function getCheck(index) {
    let result = await smartContract.methods.GetCheck(index).call();
    console.log(result);
}

async function getEvents() {
    results = await smartContract.getPastEvents(
        "AddCheck",
        {
            filter: { car_id: "140호9212" },
            fromBlock: 0,
            toBlock: "latest",
        },
        function (err, events) {
            console.log(events);
        }
    );
    console.log(results);
}
// // console.log(process.env.ADDRESS)
addCheck("25서2602", "엔진디젤", "청소상태양호", 202304241230);

// checkListNumer()
// getCheck(1)
// getEvents();
