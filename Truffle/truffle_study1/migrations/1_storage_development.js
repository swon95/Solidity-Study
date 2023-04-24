var AdvancedStorage = artifacts.require("AdvancedStorage");

module.exports = function (deployer) {
    // deployment steps
    deployer.deploy(AdvancedStorage);
};
