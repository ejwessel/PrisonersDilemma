import React, { Component } from 'react';
import PlayerScoreComponent from './GameScoreboardPlayerScoreComponent';

class ScoreboardComponent extends Component {
  render() {
    return (
      <div>
        <PlayerScoreComponent />
        <PlayerScoreComponent />
      </div>
    );
  }
}

export default ScoreboardComponent;
