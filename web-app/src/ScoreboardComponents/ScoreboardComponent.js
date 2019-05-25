import React, { Component } from 'react';
import PlayerScoreComponent from './PlayerScoreComponent';

class ScoreboardComponent extends Component {
  render() {
    return (
      <div>
        <PlayerScoreComponent 
          score ={ this.props.player1Score }
          maxScore = {this.props.maxScore }
        />
        <PlayerScoreComponent 
          score ={ this.props.player2Score }
          maxScore = {this.props.maxScore }
        />
      </div>
    );
  }
}

export default ScoreboardComponent;
