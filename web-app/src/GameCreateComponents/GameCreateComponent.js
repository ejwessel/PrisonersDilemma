import React, { Component } from 'react';
import GameCreatePlayerComponent from './GameCreatePlayerComponent';
import GameCreateScoringComponent from './GameCreateScoringComponent';

class GameCreateComponent extends Component {
  render() {
    return (
      <div>
        <GameCreatePlayerComponent
          player="1"
          addr={ this.props.p1_addr }/>
        <GameCreatePlayerComponent
          player="2"
          addr={ this.props.p2_addr }/>
        <GameCreateScoringComponent
          win={ this.props.win }
          greed={ this.props.greed }
          mutual={ this.props.mutual }
          mutual_greed={ this.props.mutual_greed } />
      </div>
    );
  }
}

export default GameCreateComponent;
