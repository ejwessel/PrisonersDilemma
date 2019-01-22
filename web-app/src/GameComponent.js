import React, { Component } from 'react';
import GameJoinComponent from './GameJoinComponents/GameJoinComponent';
import GameEventLogComponent from './GameEventLogComponents/GameEventLogComponent';
import GameScoreboardComponent from './GameScoreboardComponents/GameScoreboardComponent';

class GameComponent extends Component {
  render() {
    return (
      <div>
        <GameJoinComponent />
        <GameEventLogComponent />
        <GameScoreboardComponent />
      </div>
    );
  }
}

export default GameComponent;
