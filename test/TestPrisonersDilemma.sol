pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PrisonersDilemma.sol";

contract TestPrisonersDilemma {
    PrisonersDilemma game = PrisonersDilemma(DeployedAddresses.PrisonersDilemma());
    
    function testInitialStateUsingDeployedContract() public {
        Assert.equal(address(game.winner), address(0), "Winner address should be empty");
    }
}
