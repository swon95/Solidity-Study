// mongoDB 에 저장
const mongoose = require("mongoose");

var checkRes = mongoose.Schema({
    address: { type: String, required: true },
    blockNumber: { type: Number, required: true },
    returnValues: { type: mongoose.Schema.Types.Mixed, required: true },
    createTime: { type: Date, required: true, default: () => new Date() },
});

// // 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
// var checkModels = mongoose.model("checklist", checkRes);

// module.exports = checkModels;

let detailCheck = mongoose.Schema({
    carId: { type: String, required: true },
    blockNumber: { type: Number, required: true },
    blockHash: { type: String, required: true },
    engineOil: { type: String, required: true },
    missionOil: { type: String, required: true },
    gasBoxCheck: { type: String, required: true },
    tireCheck: { type: String, required: true },
    lightCheck: { type: String, required: true },
    createTime: { type: Date, required: true, default: () => new Date() },
});

var checkModels = mongoose.model("checklist", checkRes);
var detailCheckcheckModels = mongoose.model("detail_list", detailCheck);

module.exports = {
    checkModel: checkModels,
    detailCheckcheckModel: detailCheckcheckModels,
};
