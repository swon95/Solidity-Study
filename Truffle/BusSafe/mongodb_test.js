const mongoose = require("mongoose");
const { checkModel, detailCheckcheckModel } = require("./models");
// console.log(checkModel);
mongoose
    .connect(
        "mongodb+srv://swon95:1234@cluster0.09izr.mongodb.net/?retryWrites=true&w=majority",
        {
            //   useNewUrlPaser: true,
            //   useUnifiedTofology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        }
    )
    .then(() => console.log("MongoDB conected"))
    .catch((err) => {
        console.log(err);
    });

// models.js 로 export
var student = mongoose.Schema({
    name: "string",
    address: "string",
    age: "number",
});

// 7. 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
// var Student = mongoose.model("Schema", student);

const checkRes = new checkModel();
checkRes.address = "0x25acfF3Eca0317FBb26f66F731CE2f1803EF86cc";
checkRes.blockNumber = 45;
checkRes.returnValues = {
    0: "0x29f07b66B492FF5aA5F96C6F536166D737265b12",
    1: "140호9212",
    2: "엔진good",
    3: "청소상태불량",
    4: "202304240910",
    checker: "0x29f07b66B492FF5aA5F96C6F536166D737265b12",
    car_id: "140호9212",
    check_res: "엔진good",
    check_etc: "청소상태불량",
    check_time: "202304240910",
};

const detailCheck = new detailCheckcheckModel();
(detailCheck.carId = "0xxxxxxxx"),
    (detailCheck.blockNumber = 45),
    (detailCheck.blockHash = "asd"),
    (detailCheck.engineOil = "y"),
    (detailCheck.missionOil = "y"),
    (detailCheck.gasBoxCheck = "y"),
    (detailCheck.tireCheck = "y"),
    (detailCheck.lightCheck = "y"),
    // 데이터 저장
    checkRes.save().then((result) => {
        console.log(result);
    });
detailCheck.save().then((result) => {
    console.log(result);
});

// 8. Student 객체를 new 로 생성해서 값을 입력
// var newStudent = new Student({
//     name: "Hong Gil Dong",
//     address: "서울시 강남구 논현동",
//     age: "22",
// });

// 9. 데이터 저장
// newStudent.save().then((result) => {
//     console.log(result);
// });

// Student.find().then(function (error, students) {
//     console.log("--- Read all ---");
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(students);
//     }
// });

// var mongoose = require("mongoose");

// mongoose
//     .connect(
//         "mongodb+srv://root:1234@cluster0.09izr.mongodb.net/?retryWrites=true&w=majority",
//         {
//             // useNewUrlPaser: true,
//             // useUnifiedTofology: true,
//             // useCreateIndex: true,
//             // useFindAndModify: false,
//         }
//     )
//     .then(() => console.log("MongoDB conected"))
//     .catch((err) => {
//         console.log(err);
//     });

// // 스키마 생성
// var student = mongoose.Schema({
//     name: "string",
//     address: "string",
//     age: "number",
// });

// // 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
// var Student = mongoose.model("Schema", student);

// // Student 객체를 new 로 생성해서 값을 입력
// var newStudent = new Student({
//     name: "Hong Gil Dong",
//     address: "서울시 강남구 논현동",
//     age: "22",
// });

// // 데이터 저장
// // newStudent.save().then((result) => {
// //     console.log(result);
// // });

// // async
// Student.find().then(function (error, students) {
//     console.log("--- Read all ---");
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(students);
//     }
// });
