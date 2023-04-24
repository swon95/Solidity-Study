var AdvancedStorage = artifacts.require("AdvancedStorage");

contract("AdvancedStorage", () => {
    it("should be pushed at array", async () => {
        const smartContract = await AdvancedStorage.deployed();
        await smartContract.add(100);
        const results = await smartContract.get(0);
        const number = results.toNumber();
        console.log(typeof results.toNumber());
        // 검증 assert
        assert(number === 100, "asdddd");
    });

    it("should be returned array", async () => {
        const smartContract = await AdvancedStorage.deployed();
        await smartContract.add(50);
        const idsArr = await smartContract.getAll();
        const ids = await idsArr.map((id) => id.toNumber());
        // console.log(typeof(ids.toArray));
        assert.deepEqual(ids, [100, 50], "asdddd");
    });
});
