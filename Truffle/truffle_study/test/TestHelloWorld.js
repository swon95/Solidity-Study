// truffle 내장함수 artifacts
var HelloWorld = artifacts.require("HelloWorld");

// mochajs 이용
// 컨트랙트는 첫번째 인자만 받을 수 있음
contract("HelloWorld", (accounts) => {
    console.log(accounts);
    // console.log(data);

    // mocah 내장함수
    it("should be returned Hello World !!", async () => {
        const smartContract = await HelloWorld.deployed();
        const hello = smartContract.hello();
        assert(hello === "Hello World !!", "returns is wronging");
    });
}); // 인자에 함수를 불러와 callback 처리 -> 함수 실행
