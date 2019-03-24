import React, { Component } from 'react';

class GameCreatePlayerComponent extends Component {
  constructor(props) {
    super(props);
    this.state ={
      address: null,
      startScore: null
    }
    this.handleAddress = this.handleAddress.bind(this);
    this.handleStartScore = this.handleStartScore.bind(this);
  }

  handleAddress(event) {
    
    this.setState({address: event.target.value});
    console.log(this.state.address);
  }

  handleStartScore(event) {
    
    this.setState({startScore: event.target.value});
    console.log(this.state.startScore);
  }

  render() {
    return (
      <fieldset name={`player${this.props.playerNum}`}>
        <label>Player #:</label>
        {' '}
        <input
          type = "text"
          name = "address"
          placeholder = "address"
          onChange = { this.handleAddress }
        />
        {' '}
        <select>
          <option value = "No Choice">No Choice</option>
          <option value = "Share">Share</option>
          <option value = "Take">Take</option>
        </select>
        {' '}
        <input
          type = "text"
          name = "startScore"
          placeholder = "Start Score"
          onChange = { this.handleStartScore }
        />
      </fieldset>
    );
  }
}

export default GameCreatePlayerComponent;
