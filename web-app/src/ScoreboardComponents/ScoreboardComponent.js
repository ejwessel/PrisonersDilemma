import React, { Component } from 'react';
import PlayerScoreComponent from './PlayerScoreComponent';

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
