var expectThrow = require("./helper.js");
var PrisonersDilemma = artifacts.require("PrisonersDilemma");

var CHOICES = { "No_Choice": 0, "Share": 1, "Take": 2 };
var EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

contract('PrisonersDilemma', async (accounts) => {

    beforeEach(async() => {
        //instance = await PrisonersDilemma.deployed();
        instance = await PrisonersDilemma.new(accounts[0], accounts[1]);
    });

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

        //Test invalid Player chooses action share
        await expectThrow(instance.playerChoose(CHOICES["Share"], { from: accounts[2] }));

        //Test player cannot pass an invalid choice
        await expectThrow(instance.playerChoose(9, { from: accounts[0] }));

        //Test player chooses NoChoice
        await expectThrow(instance.playerChoose(CHOICES["NoChoice"], { from: accounts[0] }));

        //Test player cannot update choice if choice is already made
        await expectThrow(instance.playerChoose(CHOICES["Take"], { from: accounts[0] }));
    });

    it("Test getPlayerScore()", async() => {
        //Test if address passed is not in the contract
        await expectThrow(instance.getPlayerScore(accounts[2], { from: accounts[0] })); 

        //Test that a player's score can be retrieved        
        var playerScore = await instance.getPlayerScore(accounts[0], { from: accounts[0] });
        assert.equal(playerScore, 0, `player score ${ playerScore } does not match a score of 0`);
    });
    
    it("Test scoring", async() => {
        //Round 1
        await instance.playerChoose(CHOICES["Share"], { from: accounts[0] });
        await instance.playerChoose(CHOICES["Share"], { from: accounts[1] });
        var player1 = await instance.players.call(accounts[0]);
        var player2 = await instance.players.call(accounts[1]);

        //both player choices should be reset
        assert.equal(player1[1].toNumber(), 0, "PLayer 1 choice was not reset");
        assert.equal(player2[1].toNumber(), 0, "PLayer 2 choice was not reset");

        //both players should have 1 point
        assert.equal(player1[2].toNumber(), 1, "Player 1 points don't match expected");
        assert.equal(player2[2].toNumber(), 1, "Player 2 points don't match expected");

        //Round 2
        await instance.playerChoose(CHOICES["Share"], { from: accounts[0] });
        await instance.playerChoose(CHOICES["Take"], { from: accounts[1] });
        var player1 = await instance.players.call(accounts[0]);
        var player2 = await instance.players.call(accounts[1]);
    
        //both player choices should be reset
        assert.equal(player1[1].toNumber(), 0, "PLayer 1 choice was not reset");
        assert.equal(player2[1].toNumber(), 0, "PLayer 2 choice was not reset");

        //there should have been a winner
        assert.equal(player1[2].toNumber(), 1, "Player 1 points don't match expected");
        assert.equal(player2[2].toNumber(), 6, "Player 2 points don't match expected");

        //Round 3
        await instance.playerChoose(CHOICES["Share"], { from: accounts[0] });
        await instance.playerChoose(CHOICES["Take"], { from: accounts[1] });
        var player1 = await instance.players.call(accounts[0]);
        var player2 = await instance.players.call(accounts[1]);
    
        //both player choices should be reset
        assert.equal(player1[1].toNumber(), 0, "PLayer 1 choice was not reset");
        assert.equal(player2[1].toNumber(), 0, "PLayer 2 choice was not reset");

        //there should have been a winner
        assert.equal(player1[2].toNumber(), 1, "Player 1 points don't match expected");
        assert.equal(player2[2].toNumber(), 11, "Player 2 points don't match expected");

        //Round 4
        await instance.playerChoose(CHOICES["Share"], { from: accounts[0] });
        await instance.playerChoose(CHOICES["Take"], { from: accounts[1] });
        var player1 = await instance.players.call(accounts[0]);
        var player2 = await instance.players.call(accounts[1]);
    
        //both player choices should be reset
        assert.equal(player1[1].toNumber(), 0, "PLayer 1 choice was not reset");
        assert.equal(player2[1].toNumber(), 0, "PLayer 2 choice was not reset");

        //there should have been a winner
        assert.equal(player1[2].toNumber(), 1, "Player 1 points don't match expected");
        assert.equal(player2[2].toNumber(), 16, "Player 2 points don't match expected");

        //Round 5
        await instance.playerChoose(CHOICES["Share"], { from: accounts[0] });
        await instance.playerChoose(CHOICES["Take"], { from: accounts[1] });
        var player1 = await instance.players.call(accounts[0]);
        var player2 = await instance.players.call(accounts[1]);
    
        //both player choices should be reset
        assert.equal(player1[1].toNumber(), 0, "PLayer 1 choice was not reset");
        assert.equal(player2[1].toNumber(), 0, "PLayer 2 choice was not reset");

        //there should have been a winner
        assert.equal(player1[2].toNumber(), 1, "Player 1 points don't match expected");
        assert.equal(player2[2].toNumber(), 21, "Player 2 points don't match expected");

        var contractWinner = await instance.winner();
        assert.equal(contractWinner, accounts[1], "contract winner doesn't match expected.");
    });
});
