pragma solidity ^0.4.25;

//This contract mimics that of the prisoners dilemma
//
//+----------+----------------------+
//|          |       Player 2       |
//+----------+----------------------+
//|          |       | Share | Take |
//+          +-------+-------+------+
//| Player 1 | Share | 1/1   | 5/0  |
//+          +-------+-------+------+
//|          | Take  | 0/5   | 0/0  |
//+----------+-------+-------+------+
//Rules:
//- If two places 'share' they both receive 1 point and the game progresses
//- If two players 'take', they receive no points and the game doesn't progress
//- If either one of the players takes while the other player shares, the person who shared will receive no points
//- Game ends when one of the players gets 20 points
//- Ties are possible

contract PrisonersDilemma {

    //Variables for player's addresses
    //Variables for player's scores
    //Variable for winner of contract

    //Events:
    //Event when two players have entered the game; contract initialization 
    //Event when a player has made a choice
    //Event when a reveal is available
    //Event when there is a winner

    //Functions:
    //function for a player to select a choice
    //function to get a player's scores
    //function to get winner

}
