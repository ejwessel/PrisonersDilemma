import React, { Component } from 'react';
import PlayerComponent from './PlayerComponent';
import ScoringComponent from './ScoringComponent';

class CreateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1 : { address: null, choice: "0", score: "0" },
      player2: { address: null, choice: "0", score: "0" },
      scoreData: null
    };

    //handle player 
    this.handlePlayerAddress = this.handlePlayerAddress.bind(this);
    this.handlePlayerChoice = this.handlePlayerChoice.bind(this);
    this.handlePlayerScore = this.handlePlayerScore.bind(this);

    //handle scoring
    this.handleWinScore = this.handleWinScore.bind(this);
    this.handleGreedScore = this.handleGreedScore.bind(this);
    this.handleMutualScore = this.handleMutualScore.bind(this);
    this.handleMutualGreedScore = this.handleMutualGreedScore.bind(this);

    //submi
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handlePlayerAddress(playerId, address) {
    this.setState({
      ['player' + playerId]: { ...this.state['player' + playerId], address: address }
    });
  }

  handlePlayerChoice(playerId, choice) {
    this.setState({
      ['player' + playerId]: { ...this.state['player' + playerId], choice: choice }
    });
  }

 handlePlayerScore(playerId, score) {
    this.setState({
      ['player' + playerId]: { ...this.state['player' + playerId], score: score }
    });
  }

  handleWinScore(event) {
    this.setState({
      scoreData: { ...this.state['scoreData'], winScore: event.target.value }
    });
  }

  handleGreedScore(event) {
    this.setState({
      scoreData: { ...this.state['scoreData'], greedScore: event.target.value }
    });
  }

  handleMutualScore(event) {
    this.setState({
      scoreData: { ...this.state['scoreData'],  mutualScore: event.target.value }
    });
  }

  handleMutualGreedScore(event) {
    this.setState({
      scoreData: { ...this.state['scoreData'], mutualGreedScore: event.target.value }
    });
  }

  handleOnSubmit(event) {
    event.preventDefault(); //prevent refresh
    this.props.deployContract(this.state.player1, this.state.player2, this.state.scoreData);
  }

  render() {
    return (
      <div>
        <form onSubmit = { this.handleOnSubmit }>
          <PlayerComponent playerNum = { 1 } 
            setPlayerAddress = { this.handlePlayerAddress }
            setPlayerChoice = { this.handlePlayerChoice }
            setPlayerScore = { this.handlePlayerScore }
          />
          <PlayerComponent playerNum = { 2 } 
            setPlayerAddress = { this.handlePlayerAddress }
            setPlayerChoice = { this.handlePlayerChoice }
            setPlayerScore = { this.handlePlayerScore }
          />
          <ScoringComponent 
            setWinScore = { this.handleWinScore }
            setGreedPoints = { this.handleGreedScore }
            setMutualPoints = { this.handleMutualScore }
            setMutualGreedPoints = { this.handleMutualGreedScore }
          />
          <button type="submit">Start Game</button>
        </form>
      </div>
    );
  }
}

export default CreateComponent;
