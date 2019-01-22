import React, { Component } from 'react';
import GameCreatePlayerComponent from './GameCreatePlayerComponent';
import GameCreateScoringComponent from './GameCreateScoringComponent';

class GameCreateComponent extends Component {
  render() {
    return (
      <div>
        <GameCreatePlayerComponent />
        <GameCreatePlayerComponent />
        <GameCreateScoringComponent />
      </div>
    );
  }
}

export default GameCreateComponent;
