var PrisonersDilemma = artifacts.require("PrisonersDilemma");
var CHOICES = { "No_Choice": 0, "Share": 1, "Take": 2 };
var EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

contract('Async PrisonersDilemma', async (accounts) => {

    var instance = await PrisonersDilemma.deployed();

    it("Test Initial State of contract", async() => {
        var player = await instance.players.call(accounts[0]);
        assert.equal(player[0], accounts[0], "address does not match data saved");
        assert.equal(player[1].toNumber(), CHOICES["No_Choice"], "choice does not match data saved");
        assert.equal(player[2].toNumber(), 0, "score does not match data saved");
    });

    it("Test a valid Player chooses an action TEST", async() => {
        instance.playerChoose(CHOICES["Share"], { from: accounts[0] });
        var player = await instance.players.call(accounts[0]);
        assert.equal(player[0], accounts[0], "address does not match data saved");
        assert.equal(player[1].toNumber(), CHOICES["Share"], "choice does not match data saved");
        assert.equal(player[2].toNumber(), 0, "score does not match data saved");
    });

});

contract('PrisonersDilemma', function(accounts) {
    it("Test: initialize the contract with no winner", function() {
        return PrisonersDilemma.deployed().then(function(instance) {
            return instance.winner();
        }).then(function(winner) {
            assert.equal(winner, EMPTY_ADDRESS, "winner was not empty");
        });
    });


//    it("Test a valid Player chooses an action", function() {
//        return PrisonersDilemma.deployed().then(function(instance) {
//            return instance.playerChoose(CHOICES["Share"], { from: accounts[0] });
//        }).then(function(instance, result) {
//            var player = await instance.players.call(accounts[0]);
//            return player;
//        }).then(function(player) {
//            console.log(player[0]);
//        });
//    });

    it("Test an invalid Player choses an action", function() {
    });
    
    it("passSOL", function() {
        return PrisonersDilemma.deployed().then(function(instance) {
            return instance.passSOL.call(1);
        }).then(function(address) {
            console.log("output: " + JSON.stringify(address));
        });
    });
    
    it("passJS", function() {
        return PrisonersDilemma.deployed().then(function(instance) {
            return instance.passJS.call(1);
        }).then(function(address) {
            console.log("output: " + JSON.stringify(address));
        });
    });
});
