var PrisonersDilemma = artifacts.require("./PrisonersDilemma.sol");

module.exports = function(deployer, network, accounts) {

    deployer.deploy(PrisonersDilemma, accounts[0], accounts[1]);

}
