var expectThrow = require("./helper.js");
var PrisonersDilemma = artifacts.require("PrisonersDilemma");

var CHOICES = { "No_Choice": 0, "Share": 1, "Take": 2 };
var EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

contract('PrisonersDilemma', async (accounts) => {

    beforeEach(async() => {
        instance = await PrisonersDilemma.new(
            [accounts[0], CHOICES["No_Choice"], 0], 
            [accounts[1], CHOICES["No_Choice"], 0],
            [20, 5, 1]);
    });

    afterEach(async() => {
        await instance.endGame();
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
    
    it("Test player choices reset", async() => {
        instance = await PrisonersDilemma.new(
            [accounts[0], CHOICES["Take"], 0], 
            [accounts[1], CHOICES["Take"], 0],
            [1, 1, 1]);

        var player1 = await instance.players.call(accounts[0]);
        var player2 = await instance.players.call(accounts[1]);

        //both player choices should be reset
        assert.equal(player1[1].toNumber(), 0, "Player 1 choice was not reset");
        assert.equal(player2[1].toNumber(), 0, "Player 2 choice was not reset");
    });

    it("Test scoring with 1 winner", async() => {
        instance = await PrisonersDilemma.new(
            [accounts[0], CHOICES["Share"], 0], 
            [accounts[1], CHOICES["Take"], 0],
            [1, 1, 1]);

        var player1 = await instance.players.call(accounts[0]);
        var player2 = await instance.players.call(accounts[1]);
    
        //there should have been a winner
        var player1Score = await instance.getPlayerScore(accounts[0]);
        var player2Score = await instance.getPlayerScore(accounts[1]);
        assert.equal(player1Score, 0, `Player 1 points should be 0, not ${ player1Score }`);
        assert.equal(player2Score, 1, `Player 2 points should be 1, not ${ player2Score }`);

        var contractWinner = await instance.winner();
        assert.equal(contractWinner, accounts[1], `contract winner ${ contractWinner }, does not match expected ${ accounts[1] }`);

        //Test if a player can continue to play after there is a winner
        await expectThrow(instance.playerChoose(CHOICES["Take"], { from: accounts[0] }))
    });
    
    it("Test scoring with no winner", async() => {
        instance = await PrisonersDilemma.new(
            [accounts[0], CHOICES["Share"], 0], 
            [accounts[1], CHOICES["Share"], 0],
            [1, 1, 1]);

        var player1 = await instance.players.call(accounts[0]);
        var player2 = await instance.players.call(accounts[1]);
    
        //there should be no winner
        var player1Score = await instance.getPlayerScore(accounts[0]);
        var player2Score = await instance.getPlayerScore(accounts[1]);
        assert.equal(player1Score, 1, `Player 1 points should be 1, not ${ player1Score }`);
        assert.equal(player2Score, 1, `Player 2 points should be 1, not ${ player2Score }`);

        var contractWinner = await instance.winner();
        assert.equal(contractWinner, instance.address, `contract winner ${ contractWinner }, does not match expected ${ instance.address }`);

        //Test if a player can continue to play after the game is over with no winner
        await expectThrow(instance.playerChoose(CHOICES["Take"], { from: accounts[0] }))
    });

    it("Test scoring with no progression", async() => {
        instance = await PrisonersDilemma.new(
            [accounts[0], CHOICES["Take"], 0], 
            [accounts[1], CHOICES["Take"], 0],
            [1, 1, 1]);

        var player1 = await instance.players.call(accounts[0]);
        var player2 = await instance.players.call(accounts[1]);
    
        //there should be no winner
        var player1Score = await instance.getPlayerScore(accounts[0]);
        var player2Score = await instance.getPlayerScore(accounts[1]);
        assert.equal(player1Score, 0, `Player 1 points should be 0, not ${ player1Score }`);
        assert.equal(player2Score, 0, `Player 2 points should be 0, not ${ player2Score }`);
    });

    it("Test an actual game", async() => {
        await instance.playerChoose(CHOICES["Share"], { from: accounts[0] });
        await instance.playerChoose(CHOICES["Share"], { from: accounts[1] });

        for(i = 0; i < 4; i++) {
            await instance.playerChoose(CHOICES["Share"], { from: accounts[0] });
            await instance.playerChoose(CHOICES["Take"], { from: accounts[1] });
        }

        var player1 = await instance.players.call(accounts[0]);
        var player2 = await instance.players.call(accounts[1]);
    
        //both player choices should be reset
        assert.equal(player1[1].toNumber(), 0, "Player 1 choice was not reset");
        assert.equal(player2[1].toNumber(), 0, "Player 2 choice was not reset");

        //there should have been a winner
        var player1Score = await instance.getPlayerScore(accounts[0]);
        var player2Score = await instance.getPlayerScore(accounts[1]);
        assert.equal(player1Score, 1, `Player 1 points should be 1, not ${ player1Score }`);
        assert.equal(player2Score, 21, `Player 2 points should be 21, not ${ player2Score }`);

        var contractWinner = await instance.winner();
        assert.equal(contractWinner, accounts[1], `contract winner ${ contractWinner }, does not match expected ${ accounts[1] }`);

        //Test if a player can continue to play after there is a winner
        await expectThrow(instance.playerChoose(CHOICES["Take"], { from: accounts[0] }))
    });

    it("Gas Analysis", async() => {
        var estimate = 0;
        var receipt = 0;

        console.log(web3.version.api);
        console.log(web3.version.ethereum);

        instance = await PrisonersDilemma.new(
            [accounts[0], CHOICES["No_Choice"], 0], 
            [accounts[1], CHOICES["No_Choice"], 0],
            [1, 1, 1]);

//        console.log(instance.estimateGas);
//        estimate = await web3.eth.estimateGas(instance);
//        console.log(estimate);
        //receipt = await web3.eth.getTransactionReceipt(instance.transactionHash);
        //console.log(`Constructor - Gas estimate: ${ web3.fromWei(estimate, "ether") } Gas Used: ${ web3.fromWei(receipt.gasUsed, "ether") }`);
       
        //=====================================================================
//        estimate = await web3.eth.estimateGas(
//            instance.playerChoose(CHOICES["Share"], { from: accounts[0] })
//        );
        estimate  = await instance.playerChoose.estimateGas(CHOICES["Share"], { from: accounts[0] });

        instance.playerChoose(CHOICES["Share"], { from: accounts[0] })
        receipt = await web3.eth.getTransactionReceipt(instance.transactionHash);

        console.log("playerChoose");
        console.log(`Gas estimate: ${ web3.fromWei(estimate, "ether") }`);
        console.log(`Gas Used: ${ web3.fromWei(receipt.gasUsed, "ether") }`);
        console.log(`${ receipt.gasUsed / estimate * 100}%`);
    });
});
