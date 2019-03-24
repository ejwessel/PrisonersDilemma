import React, { Component } from 'react';
import GameCreatePlayerComponent from './GameCreatePlayerComponent';
import GameCreateScoringComponent from './GameCreateScoringComponent';

class GameCreateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1 : null,
      player2: null,
      scoreData: null
    };

    this.handleAddress = this.handleAddress.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  handleAddress(playerId, address) {
    //save local state
    console.log(address)
    this.setState({
      ['player' + playerId]: { address: address}
    });
  }

  handleChoice(playerId, choice) {
    //save local state
    console.log(choice)
    this.setState({
      ['player' + playerId]: { choice: choice }
    });
  }

  handleScore(playerId, score) {
    //save local state
    console.log(score)
    this.setState({
      ['player' + playerId]: { score: score }
    });
  }

  handleScoreData(scoreData) {
    this.setState({
      scoreData: scoreData
    });
  }

  render() {
    return (
      <div>
        <form>
          <GameCreatePlayerComponent playerNum = { 1 } 
            setPlayerAddress = { this.handleAddress }
            setPlayerChoice = { this.handleChoice }
            setPlayerScore = { this.handleScore }
          />
          <GameCreatePlayerComponent playerNum = { 2 } 
            setPlayerAddress = { this.handleAddress }
            setPlayerChoice = { this.handleChoice }
            setPlayerScore = { this.handleScore }
          />
          <GameCreateScoringComponent 
            setScoreData = { this.handleScoreData }
          />
          <button type="submit">Start Game</button>
        </form>
      </div>
    );
  }
}

export default GameCreateComponent;
