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
    mapping (address => Player) public players;
    address public winner = address(0); //empty address

    //Events
    event ContractInitialized(address _player1, address _player2);
    event PlayerSelectedChoice(address _player);
    event AlertWinner(address _player);

    constructor(address _player1, address _player2) public {

        Player memory player1 = Player(_player1, ActionChoices.NoChoice, 0);
        Player memory player2 = Player(_player2, ActionChoices.NoChoice, 0);

        players[_player1].addr = _player1;
        players[_player2].addr = _player2;
        emit ContractInitialized(_player1, _player2);
    }

    //Functions:
    //function for a player to select a choice
    function playerChoose(ActionChoices choice) public { 

        //Require player is within the players mapping
        //0 is default value. We aren't going to allow default values
        require(players[msg.sender].addr != address(0), "Player address is not in contract");

        //Require player has not passed 'NoChoice'
        require(choice != ActionChoices.NoChoice, "No selection made, player chose No Choice");

        //Update player choice iff the existing state is ActionChoices.NoChoice
        //Otherwise the player has already made a choice
        require(players[msg.sender].choice == ActionChoices.NoChoice, "Player already made a choice");
       
       //Set Player Choice 
        players[msg.sender].choice = choice;

        emit PlayerSelectedChoice(msg.sender);
    }
    //function to get a player's scores
    //function to get winner

}
