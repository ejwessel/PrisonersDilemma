import React, { Component } from 'react';
import GameJoinComponent from './GameJoinComponents/GameJoinComponent';
import GameEventLogComponent from './GameEventLogComponents/GameEventLogComponent';
import GameScoreboardComponent from './GameScoreboardComponents/GameScoreboardComponent';
import GameTurnsComponent from './GameTurnsComponents/GameTurnsComponent';
import GameCreateComponent from './GameCreateComponents/GameCreateComponent';

class GameComponent extends Component {
  render() {
    return (
      <div>
        <GameCreateComponent
          p1_addr="0001"
          p2_addr="0002"
          win="20"
          greed="10"
          mutual="1"
          mutual_greed="0"/>
        <GameJoinComponent />
        <GameEventLogComponent />
        <GameScoreboardComponent />
        <GameTurnsComponent />
      </div>
    );
  }
}

export default GameComponent;
