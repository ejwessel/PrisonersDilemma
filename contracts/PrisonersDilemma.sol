pragma solidity ^0.4.24;

/**
This contract mimics that of the prisoners dilemma

+----------+----------------------+
|          |       Player 2       |
+----------+----------------------+
|          |       | Share | Take |
+          +-------+-------+------+
| Player 1 | Share | 1/1   | 5/0  |
+          +-------+-------+------+
|          | Take  | 0/5   | 0/0  |
+----------+-------+-------+------+
Rules:
- If two places 'share' they both receive 1 point and the game progresses
- If two players 'take', they receive no points and the game doesn't progress
- If either one of the players takes while the other player shares, the person who shared will receive no points
- Game ends when one of the players gets 20 points
- Ties are possible
**/

contract PrisonersDilemma {

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
    uint constant private WINNING_SCORE = 20;

    //Events
    event ContractInitialized(address _player1, address _player2);
    event PlayerSelectedChoice(address _player);
    event AlertWinner(address _player);

    constructor(address _player1, address _player2) public {

        Player memory player1 = Player(_player1, ActionChoices.NoChoice, 0);
        Player memory player2 = Player(_player2, ActionChoices.NoChoice, 0);

        players[_player1].addr = _player1;
        playerList.push(_player1);
        players[_player2].addr = _player2;
        playerList.push(_player2);
        emit ContractInitialized(_player1, _player2);
    }

    //Functions:
    //function for a player to select a choice
    function playerChoose(ActionChoices choice) public returns (ActionChoices){ 

        //Require player is within the players mapping
        //0 is default value. We aren't going to allow default values
        require(players[msg.sender].addr != address(0), "Player address is not in contract");

        //Require player to not pass 'NoChoice'
        require(choice != ActionChoices.NoChoice, "No selection made, player chose No Choice");

        //Update player choice iff the existing state is ActionChoices.NoChoice
        //Otherwise the player has already made a choice
        require(players[msg.sender].choice == ActionChoices.NoChoice, "Player already made a choice");
      
        //TODO: need a condition to prevent players from playing after a winner is found

        //Set Player Choice 
        players[msg.sender].choice = choice;

        emit PlayerSelectedChoice(msg.sender);

        handlePlayerChoice();
    }

    //function to handle after a player chooses
    function handlePlayerChoice() private {
        for (uint i = 0; i < playerList.length; i++) {
            //get opponent address
            address opponentAddr = playerList[i];
            //if the opponent is the current player ignore
            if(opponentAddr == msg.sender) {
                continue;
            }
            //get the opponent
            Player memory opponent = players[opponentAddr];
            //check if the opponent has made a choice yet
            if( opponent.choice == ActionChoices.NoChoice ) {
                return;
            }
            
            //get the current player
            Player memory currentPlayer = players[msg.sender];
            
            //handle scoring logic
            if(opponent.choice == ActionChoices.Take && currentPlayer.choice == ActionChoices.Take) {
                return;
            } else if (opponent.choice == ActionChoices.Share && currentPlayer.choice == ActionChoices.Take) {
                currentPlayer.score += 5;
            } else if (opponent.choice == ActionChoices.Take && currentPlayer.choice == ActionChoices.Share) {
                opponent.score += 5;
            } else {
                currentPlayer.score += 1;
                opponent.score += 1;
            }

            //after scoring check if there is a winner and set winner
            if(currentPlayer.score >= WINNING_SCORE || opponent.score >= WINNING_SCORE){
                if(currentPlayer.score >= WINNING_SCORE && opponent.score == WINNING_SCORE){
                    //no winner
                    return;
                } else if (currentPlayer.score >= WINNING_SCORE) {
                    //current player winner
                    winner = currentPlayer.addr;
                } else {
                    //opponent winner
                    winner = opponent.addr;
                }
                emit AlertWinner(winner);
            }
            //implicit else do nothing if nobody has won
        }
    }

    //function to get a player's scores
    function getPlayerScore(address playerAddr) public view returns (uint){

        //require the player is in the map in order to look them up
        require(players[playerAddr].addr != address(0), "Player address is not in contract");
        return players[playerAddr].score;
    }
}
