import React, { Component } from 'react';

class PlayerScoreComponent extends Component {
  render() {
    return (
      <form>
        <label>Player # Score</label>
        {' '}
        <input
          type = "text"
          score = "0"
          value = "0"
          readOnly
        />
        {' '}
        <input
          type = "text"
          winning_score = "0"
          value = "0"
          readOnly
        />
      </form>
    );
  }
}

export default PlayerScoreComponent;
