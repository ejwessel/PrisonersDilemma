import React, { Component } from 'react';

class GameCreatePlayerComponent extends Component {
  constructor(props) {
    super(props);

    //event handlers
    this.handleAddress = this.handleAddress.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  handleAddress(event) {
    this.props.setPlayerAddress(this.props.playerNum, event.target.value);
  }

  handleChoice(event) {
    this.props.setPlayerChoice(this.props.playerNum, event.target.value);
  }

  handleScore(event) {
    this.props.setPlayerScore(this.props.playerNum, event.target.value);
  }

  render() {
    return (
      <div>
        <label>Player #:</label>
        {' '}
        <input
          type = "text"
          name = "address"
          placeholder = "address"
          onChange = { this.handleAddress }
        />
        {' '}
        <select onChange = { this.handleChoice }>
          <option value = "No Choice">No Choice</option>
          <option value = "Share">Share</option>
          <option value = "Take">Take</option>
        </select>
        {' '}
        <input
          type = "text"
          score = "startScore"
          placeholder = "Start Score"
          onChange = { this.handleScore }
        />
      </div>
    );
  }
}

export default GameCreatePlayerComponent;
