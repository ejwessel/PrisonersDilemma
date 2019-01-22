import React, { Component } from 'react';
import GameScoreboardPlayerScoreComponent from './GameScoreboardPlayerScoreComponent';

class GameScoreboardComponent extends Component {
  render() {
    return (
      <div>
        <GameScoreboardPlayerScoreComponent />
        <GameScoreboardPlayerScoreComponent />
      </div>
    );
  }
}

export default GameScoreboardComponent;
