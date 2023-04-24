require("dotenv").config();
const mongoose = require("mongoose");
const { checkModel, detailCheckcheckModel } = require("./models");

// mongoDB 를 조회하고 저장하는 객체
mongoDBClass = {
    // 현재 클래스 내부에 전역으로 this
    url: process.env.URL, // propertie

    check_res: async function (address, blockNumber, returnValues) {
        await mongoose.connect(process.env.URL);

        const checkRes = new checkModel();
        checkRes.address = address;
        checkRes.blockNumber = blockNumber;
        checkRes.returnValues = returnValues;

        // checkRes.save().then((result) => {
        //     console.log(result);
        //     mongoose.connection.close();
        // });

        result = await checkRes.save();
        console.log(result);
        await mongoose.connection.close();
    },

    // async await 제거 시 에러 발생
    check_detail: async function (
        carId,
        blockNumber,
        blockHash,
        engineOil,
        missionOil,
        gasBoxCheck,
        tireCheck,
        lightCheck
    ) {
        await mongoose.connect(process.env.URL);

        var detailCheck = await new detailCheckcheckModel();
        detailCheck.carId = carId;
        detailCheck.blockNumber = blockNumber;
        detailCheck.blockHash = blockHash;
        detailCheck.engineOil = engineOil;
        detailCheck.missionOil = missionOil;
        detailCheck.gasBoxCheck = gasBoxCheck;
        detailCheck.tireCheck = tireCheck;
        detailCheck.lightCheck = lightCheck;

        detailCheck.save().then((result) => {
            console.log(result);
            //mongoose.connection.close();
        });
    },
};

// mongoDBClass.check_res("0xas31463545344354", 130, { a: 1, b: 2 });
mongoDBClass.check_detail(
    "carId",
    300,
    "blockash",
    "engineOil",
    "missionOil",
    "gasBoCheck",
    "tireCeck",
    "lightheck"
);
module.exports = mongoDBClass;
