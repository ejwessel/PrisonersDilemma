var PrisonersDilemma = artifacts.require("./PrisonersDilemma.sol");

module.exports = function(deployer, network, accounts) {
    
    console.log("Deploying contract with: ");
    console.log(accounts[0]);
    console.log(accounts[1]);
    deployer.deploy(PrisonersDilemma, accounts[0], accounts[1]);

}
