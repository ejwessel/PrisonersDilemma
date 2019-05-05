var PrisonersDilemma = artifacts.require("PrisonersDilemma");
const truffleAssert = require('truffle-assertions');
const helper = require('./utils/utils.js');

var CHOICES = { "No_Choice": 0, "Share": 1, "Take": 2 };
var EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

contract('PrisonersDilemma', async (accounts) => {
  before(async() => {
    console.log(`\tWeb 3 Api Version: ${ web3.version }`);
    instance = await PrisonersDilemma.new(
      [accounts[0], CHOICES["No_Choice"], 0], 
      [accounts[1], CHOICES["No_Choice"], 0],
      [20, 5, 1, 0]);
  });

  beforeEach(async() => {
    snapShot = await helper.takeSnapshot();
    snapshotId = snapShot['result'];
  });

  afterEach(async() => {
    await helper.revertToSnapShot(snapshotId);
  });

  describe("Test Initial State of contract", async() => {
    before("setup", async() => {
      player_1 = await instance.players(accounts[0]);
      player_2 = await instance.players(accounts[1]);
    });

    it("Test players exist", async() => {
      let address_player1 = player_1[0];
      let address_player2 = player_2[0];

      assert.equal(address_player1, accounts[0], "player 1 does not exist");
      assert.equal(address_player2, accounts[1], "player 2 does not exist");
    });

    it("Test players initial choices", async() => {
      let choice_player1 = player_1[1].toNumber();
      let choice_player2 = player_2[1].toNumber();

      assert.equal(choice_player1, 0, "player 1 score should be 0");
      assert.equal(choice_player2, 0, "player 2 score should be 0");
    });

    it("Test players initial scores", async() => {
      let score_player1 = player_1[2].toNumber();
      let score_player2 = player_2[2].toNumber();

      assert.equal(score_player1, 0, "player 1 score should be 0");
      assert.equal(score_player2, 0, "player 2 score should be 0");
    });

    it("Test invalid player", async() => {
      //Get Invalid Player from mapping
      var player = await instance.players(accounts[2]);
      var playerAddr = player[0];
      //Invalid Player's don't have an address saved for their address
      assert.equal(playerAddr, EMPTY_ADDRESS, `player address ${ playerAddr } was valid and should not be`);
    });

    it("Test initial winner", async() => {
      //Test winner is nobody
      var contractWinner = await instance.winner();
      assert.equal(contractWinner, EMPTY_ADDRESS, `initial contract winner should be empty`);
    });
  });

  describe("Test playerChoose()", async() => {
    it("Test playerChoose succcess", async() => {
      //Player chooses Share 
      await truffleAssert.passes(instance.playerChoose(CHOICES["Share"], { from: accounts[0] }));

      //Get Player from mapping
      var player = await instance.players(accounts[0]);
      var playerChoice = player[1].toNumber();

      await assert.equal(playerChoice, CHOICES["Share"], `player choice ${ CHOICES["SHARE"] } was not recorded`);
    });
    
    it("Test invalid Player", async() => {
      await truffleAssert.fails(instance.playerChoose(CHOICES["Share"], { from: accounts[2] }), "Player address is not in contract");
    });

    it("Test invalid choice", async() => {
      //fails on enum value being invalid, but has no error message
      await truffleAssert.fails(instance.playerChoose(9, { from: accounts[0] }))
    });

    it("Test player chooses No Choice", async() => {
      await truffleAssert.fails(instance.playerChoose(CHOICES["No_Choice"], { from: accounts[0] }), "No selection made, player chose No Choice");
    })

    it("Test player cannot update choice if choice is already made", async() => {
      await instance.playerChoose(CHOICES["Share"], { from: accounts[0] });
      await truffleAssert.fails(instance.playerChoose(CHOICES["Take"], { from: accounts[0] }), "Player already made a choice");
    })
  });

  describe("Test getPlayerScore()", async() => {
    it("Test a valid player's score can be retrieved", async() => {
      //Test that a player's score can be retrieved        
      await truffleAssert.passes(instance.getPlayerScore.call(accounts[0]));
      let playerScore = await instance.getPlayerScore.call(accounts[0]);
      assert.equal(playerScore, 0, `player score ${ playerScore } does not match a score of 0`);
    });

    it("Test an invalid player's score cannot be retrieved", async() => {
      //Test if address passed is not in the contract
      await truffleAssert.fails(instance.getPlayerScore(accounts[2]), "Player address is not in contract");
    });
  });

  describe("Test scoring", async() => {
    it("Test scoring with 1 winner", async() => {
        instance = await PrisonersDilemma.new(
            [accounts[0], CHOICES["Share"], 0], 
            [accounts[1], CHOICES["Take"], 0],
            [1, 1, 1, 0]);

        var player1 = await instance.players(accounts[0]);
        var player2 = await instance.players(accounts[1]);
    
        //there should have been a winner
        var player1Score = await instance.getPlayerScore(accounts[0]);
        var player2Score = await instance.getPlayerScore(accounts[1]);
        assert.equal(player1Score, 0, `Player 1 points should be 0, not ${ player1Score }`);
        assert.equal(player2Score, 1, `Player 2 points should be 1, not ${ player2Score }`);

        var contractWinner = await instance.winner();
        assert.equal(contractWinner, accounts[1], `contract winner ${ contractWinner }, does not match expected ${ accounts[1] }`);

        //Test if a player can continue to play after there is a winner
        await truffleAssert.fails(instance.playerChoose(CHOICES["Take"], { from: accounts[0] }))
    });

    it("Test scoring with no progression", async() => {
        instance = await PrisonersDilemma.new(
            [accounts[0], CHOICES["Take"], 0], 
            [accounts[1], CHOICES["Take"], 0],
            [1, 1, 1, 0]);

        var player1 = await instance.players(accounts[0]);
        var player2 = await instance.players(accounts[1]);
    
        //there should be no winner
        var player1Score = await instance.getPlayerScore(accounts[0]);
        var player2Score = await instance.getPlayerScore(accounts[1]);
        assert.equal(player1Score, 0, `Player 1 points should be 0, not ${ player1Score }`);
        assert.equal(player2Score, 0, `Player 2 points should be 0, not ${ player2Score }`);
    });

    it("Test scoring with no winner", async() => {
        instance = await PrisonersDilemma.new(
            [accounts[0], CHOICES["Share"], 0], 
            [accounts[1], CHOICES["Share"], 0],
            [1, 1, 1, 0]);

        var player1 = await instance.players(accounts[0]);
        var player2 = await instance.players(accounts[1]);
    
        //there should be no winner
        var player1Score = await instance.getPlayerScore(accounts[0]);
        var player2Score = await instance.getPlayerScore(accounts[1]);
        assert.equal(player1Score, 1, `Player 1 points should be 1, not ${ player1Score }`);
        assert.equal(player2Score, 1, `Player 2 points should be 1, not ${ player2Score }`);

        var contractWinner = await instance.winner();
        assert.equal(contractWinner, instance.address, `contract winner ${ contractWinner }, does not match expected ${ instance.address }`);

        //Test if a player can continue to play after the game is over with no winner
        await truffleAssert.fails(instance.playerChoose(CHOICES["Take"], { from: accounts[0] }))
    });
  });

  describe("Gas Estimates", async() => {
    it("Gas Analysis", async() => {
      var estimate = 0;

      // Create
      var receipt = await web3.eth.getTransactionReceipt(instance.transactionHash);
      console.log(receipt);
      console.log(`\tcontract creation gas estimate: ${ receipt.gasUsed }`);
      // Choose
      estimate  = await instance.playerChoose.estimateGas(CHOICES["Share"], { from: accounts[0] });
      console.log(`\tplayerChoose() gas estimate: ${ estimate }`);
      // Destroy 
      estimate = await instance.endGame.estimateGas();
      console.log(`\tendGame() gas estimate: ${ estimate }`);
    });
  });

  describe("other tests", async() => {
    it("Test player choices reset", async() => {
      instance = await PrisonersDilemma.new(
          [accounts[0], CHOICES["Take"], 0], 
          [accounts[1], CHOICES["Take"], 0],
          [1, 1, 1, 0]);

      var player1 = await instance.players(accounts[0]);
      var player2 = await instance.players(accounts[1]);

      //both player choices should be reset
      assert.equal(player1[1].toNumber(), 0, "Player 1 choice was not reset");
      assert.equal(player2[1].toNumber(), 0, "Player 2 choice was not reset");
    });

    it("Test an actual game", async() => {
        await instance.playerChoose(CHOICES["Share"], { from: accounts[0] });
        await instance.playerChoose(CHOICES["Share"], { from: accounts[1] });

        for(i = 0; i < 4; i++) {
            await instance.playerChoose(CHOICES["Share"], { from: accounts[0] });
            await instance.playerChoose(CHOICES["Take"], { from: accounts[1] });
        }

        var player1 = await instance.players(accounts[0]);
        var player2 = await instance.players(accounts[1]);
    
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
  });
});
