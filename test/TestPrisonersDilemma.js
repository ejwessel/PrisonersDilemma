var expectThrow = require("./helper.js");

var PrisonersDilemma = artifacts.require("PrisonersDilemma");
var CHOICES = { "No_Choice": 0, "Share": 1, "Take": 2 };
var EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

contract('Async PrisonersDilemma', async (accounts) => {

    var instance = await PrisonersDilemma.deployed();

    it("Test Initial State of contract", async() => {
        //Get Player from mapping
        var player = await instance.players.call(accounts[0]);
        var playerAddr = player[0];
        var playerChoice = player[1].toNumber();
        var playerScore = player[2];
       
        //Test Player we expect to exist exists
        assert.equal(playerAddr, accounts[0], `player address ${ playerAddr } is not within the contract mapping`);
        assert.equal(playerChoice, CHOICES["No_Choice"], `player choice ${ playerChoice } does not match no choice`);
        assert.equal(playerScore, 0, `player score ${ playerScore } does not match a score of 0`);

        //Test winner is nobody
        var contractWinner = await instance.winner();
        assert.equal(contractWinner, EMPTY_ADDRESS, `initial contract winner should be empty`);
    });

    it("Test invalid player not in contract", async() => {
        //Get Invalid Player from mapping
        var player = await instance.players.call(accounts[2]);
        var playerAddr = player[0];
        //Invalid Player's don't have an address saved for their address
        assert.equal(playerAddr, EMPTY_ADDRESS, `player address ${ playerAddr } was valid and should not be`);
    });

    it("Test playerChoose()", async() => {
        //Player chooses Share
        await instance.playerChoose(CHOICES["Share"], { from: accounts[0] });
        //Get Player from mapping
        var player = await instance.players.call(accounts[0]);
        var playerChoice = player[1].toNumber();
        assert.equal(playerChoice, CHOICES["Share"], `player choice ${ CHOICES["SHARE"] } was not recorded`);

        //Test invalid Player chooses action
        await expectThrow(instance.playerChoose(CHOICES["Share"], { from: accounts[2] }));

        //Test player chooses NoChoice
        await expectThrow(instance.playerChoose(CHOICES["NoChoice"], { from: accounts[0] }));

        //Test player cannot update choice if choice is already made
        await expectThrow(instance.playerChoose(CHOICES["Take"], { from: accounts[0] }));
    });
});
