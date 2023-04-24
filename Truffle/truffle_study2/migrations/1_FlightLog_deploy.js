var FlightLog = artifacts.require("FlightLog");

module.exports = function (deployer) {
    // deployment steps
    deployer.deploy(FlightLog);
};
