import React, { Component } from 'react';

class GameCreateScoringComponent extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <label>Scoring:</label>
        {' '}
        <input
          type = "text"
          placeholder = "Win Score"
          onChange = { this.props.setWinScore }
        />
        {' '}
        <input
          type = "text"
          placeholder = "Greed Points"
          onChange = { this.props.setGreedPoints }
        />
        {' '}
        <input
          type = "text"
          placeholder = "Mutual Points"
          onChange = { this.props.setMutualPoints }
        />
        {' '}
        <input
          type = "text"
          placeholder = "Mutual Greed Points"
          onChange = { this.props.setMutualGreedPoints }
        />
      </div>
    );
  }
}

export default GameCreateScoringComponent;
