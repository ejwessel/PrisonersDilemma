pragma solidity ^0.4.25;

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
        address addr = address(0); //empty address
        ActionChoices choice = ActionChoices.NoChoice;
        uint score = 0;
    }

    //State Variables
    mapping (address => Player) private players;
    address private winner = address(0); //empty address

    //Events
    event ContractInitialized(address _player1, address _player2);
    event PlayerSelectedChoice(address _player);
    event AlertWinner(address _player);

    constructor(address _player1, address _player2) {
        players[_player1].addr = _player1;
        players[_player2].addr = _player2;
        emit ContractInitialized(_player1, _player2);
    }

    //Functions:
    //function for a player to select a choice
    //function to get a player's scores
    //function to get winner

}
