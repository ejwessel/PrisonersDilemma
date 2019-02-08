import React, { Component } from 'react';

class GameCreatePlayerComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("doesn't do anything yet")
  }

  render() {
    return (
      <div>
        <label>Player {this.props.player}:</label>
        {' '}
        <input
          type = "text"
          win_score = ""
          value = {this.props.addr}
          onChange = { this.handleChange }
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
          start_score = ""
          value = "Start Score"
          onChange = { this.handleChange }
        />
      </div>
    );
  }
}

export default GameCreatePlayerComponent;
