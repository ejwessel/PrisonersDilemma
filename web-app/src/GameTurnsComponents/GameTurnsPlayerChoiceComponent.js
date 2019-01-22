import React, { Component } from 'react';

class GameTurnsPlayerChoiceComponent extends Component {
  render() {
    return (
      <form>
        <label>Player #</label>
        {' '}
        <input
          type = "text"
          contract_address = ""
          value = "address"
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
          value = "0"
        />
        {' '}
        <input
          type = "button"
          value = "Select Choice"
          onClick = { this.submitForm }
        />
      </form>
    );
  }
}

export default GameTurnsPlayerChoiceComponent;
