pragma solidity ^0.4.24;

contract PrisonersDilemma {

    //Constants
    uint constant private WINNING_SCORE = 20;
    uint constant private GREEDY_POINTS = 5;
    uint constant private MUTUAL_POINTS = 1;
    enum ActionChoices { NoChoice, Share, Take }

    struct Player {
        address addr;
        ActionChoices choice;
        uint score;
    }

    //State Variables
    address[] private playerList;
    mapping (address => Player) public players;
    address public winner = address(0); //empty address

    //Events
    event ContractInitialized(address _player1, address _player2);
    event PlayerSelectedChoice(address _player);
    event PlayersScoresTallied();
    event AlertWinner(address _player);

    constructor(address _player1, address _player2) public {

        players[_player1] = Player(_player1, ActionChoices.NoChoice, 0);
        playerList.push(_player1);
        
        players[_player2] = Player(_player2, ActionChoices.NoChoice, 0);
        playerList.push(_player2);

        emit ContractInitialized(_player1, _player2);
    }

    //Functions:
    //function for a player to select a choice
    function playerChoose(ActionChoices choice) public returns (ActionChoices){ 

        //Require player is within the players mapping
        //0 is default value. We aren't going to allow default values
        require(players[msg.sender].addr != address(0), "Player address is not in contract");

        //Game stops once a winner has been declared
        require(winner == address(0), "A winner or tie has been declared");

        //Require player to not pass 'NoChoice'
        require(choice != ActionChoices.NoChoice, "No selection made, player chose No Choice");

        //Update player choice iff the existing state is ActionChoices.NoChoice
        //Otherwise the player has already made a choice
        require(players[msg.sender].choice == ActionChoices.NoChoice, "Player already made a choice");
      
        //Set Player Choice 
        players[msg.sender].choice = choice;
        emit PlayerSelectedChoice(msg.sender);

        tallyPlayerScores();
        checkForWinner();
    }

    function tallyPlayerScores() private {
        //get players
        Player storage player1 = players[playerList[0]];
        Player storage player2 = players[playerList[1]];

        //check either player hasn't made a choice and exit
        if ((player1.choice == ActionChoices.NoChoice) || (player2.choice == ActionChoices.NoChoice)) {
            //I don't require here because require would refund gas
            return;
        }

        //tally player scores
        if(player1.choice == ActionChoices.Take && player2.choice == ActionChoices.Take) {
            //both players are awarded 0 points
            return;
        } else if (player1.choice == ActionChoices.Share && player2.choice == ActionChoices.Take) {
            player2.score += GREEDY_POINTS;
        } else if (player1.choice == ActionChoices.Take && player2.choice == ActionChoices.Share) {
            player1.score += GREEDY_POINTS;
        } else {
            player2.score += MUTUAL_POINTS;
            player1.score += MUTUAL_POINTS;
        }

        //reset player choices for next round
        player1.choice = ActionChoices.NoChoice;
        player2.choice = ActionChoices.NoChoice;

        emit PlayersScoresTallied();
    }

    function checkForWinner() private {
        //get players
        Player storage player1 = players[playerList[0]];
        Player storage player2 = players[playerList[1]];
        
        if (player1.score < WINNING_SCORE && player2.score < WINNING_SCORE) {
            //no winner keep playing
            return;
        } else if(player1.score >= WINNING_SCORE && player2.score >= WINNING_SCORE) {
            //there is no winner, set the winner as the contract
            winner = this;
        } else if (player1.score >= WINNING_SCORE) {
            winner = player1.addr;
        } else {
            winner = player2.addr;
        } 
        emit AlertWinner(winner);
    }

    //function to get a player's scores
    function getPlayerScore(address playerAddr) public view returns (uint){

        //require the player is in the map in order to look them up
        require(players[playerAddr].addr != address(0), "Player address is not in contract");
        return players[playerAddr].score;
    }
}
