pragma solidity ^0.5.0;

/** @title Prisoners Dilemma **/
contract PrisonersDilemma {

    enum ActionChoices { NoChoice, Share, Take }

    struct Player {
        address addr;
        ActionChoices choice;
        uint score;
    }

    struct ScoringData {
        uint winning_score;
        uint greedy_points;
        uint mutual_points;
        uint mutual_greedy_points;
    }

    //State Variables
    ScoringData private scoringData;
    address[] private playerList;
    mapping (address => Player) public players;
    address public winner = address(0); //empty address

    //Events
    event ContractInitialized(address player1Addr, address player2Addr, uint[] scoringData);
    event PlayerSelectedChoice(address _player);
    event PlayersScoresTallied();
    event AlertWinner(address _player);
    event ContractDeleted();

    /** @dev Instantiates the Prisoners Dilemma
      * @param _player1 An array of Player 1 data [address, initialChoice, initialScore]
      * @param _player2 An array of Player 2 data [address, initialChoice, initialScore]
      * @param _scoringData An array of scoring data that the game is going to follow 
      * [winning score, greedy score, mutual score, mutual greedy score]
      */
    constructor(uint[] memory _player1, uint[] memory _player2, uint[] memory _scoringData) public {

        address player1Addr = address(_player1[0]);
        address player2Addr = address(_player2[0]);

        ActionChoices player1Choice = ActionChoices(_player1[1]);
        ActionChoices player2Choice = ActionChoices(_player2[1]);

        uint player1Score = _player1[2];
        uint player2Score = _player2[2];

        players[player1Addr] = Player(player1Addr, player1Choice, player1Score);
        playerList.push(player1Addr);
        
        players[player2Addr] = Player(player2Addr, player2Choice, player2Score);
        playerList.push(player2Addr);

        scoringData = ScoringData(_scoringData[0], _scoringData[1], _scoringData[2], _scoringData[3]);

        emit ContractInitialized(player1Addr, player2Addr, _scoringData);

        //provided if we pass in player state we should tally and check for winner
        //this will add gas cost
        tallyPlayerScores();
        checkForWinner();
    }

    /** @dev Function for a player to select a choice
      * @param choice the players choice that needs to be saved
      */
    function playerChoose(ActionChoices choice) public { 

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

    /** @dev Tallies the player's scores given their choices */
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
        if(player1.choice == ActionChoices.Share && player2.choice == ActionChoices.Share){
            player2.score += scoringData.mutual_points;
            player1.score += scoringData.mutual_points;
        } else if (player1.choice == ActionChoices.Share && player2.choice == ActionChoices.Take) {
            player2.score += scoringData.greedy_points;
        } else if (player1.choice == ActionChoices.Take && player2.choice == ActionChoices.Share) {
            player1.score += scoringData.greedy_points;
        } else {
            //last choice is take/take
            player1.score += scoringData.mutual_greedy_points;
            player2.score += scoringData.mutual_greedy_points;
        }

        //reset player choices for next round
        player1.choice = ActionChoices.NoChoice;
        player2.choice = ActionChoices.NoChoice;

        emit PlayersScoresTallied();
    }

    /** @dev Method checks for a winner given the points of the users */
    function checkForWinner() private {
        //get players
        Player storage player1 = players[playerList[0]];
        Player storage player2 = players[playerList[1]];
        
        if (player1.score < scoringData.winning_score && player2.score < scoringData.winning_score) {
            //no winner keep playing
            return;
        } else if(player1.score >= scoringData.winning_score && player2.score >= scoringData.winning_score) {
            //there is no winner, set the winner as the contract
            winner = address(this);
        } else if (player1.score >= scoringData.winning_score) {
            winner = player1.addr;
        } else {
            winner = player2.addr;
        } 
        emit AlertWinner(winner);
    }

    /** @dev Function to get a player's scores
      * @param playerAddr the players address we want to get a score for
      * @return the player's score
      */
    function getPlayerScore(address playerAddr) public view returns (uint){

        //require the player is in the map in order to look them up
        require(players[playerAddr].addr != address(0), "Player address is not in contract");
        return players[playerAddr].score;
    }

    function endGame() public {
        emit ContractDeleted();
        selfdestruct(address(0));
    }
}
