import React, { Component } from 'react';
import PlayerScoreComponent from './PlayerScoreComponent';

class ScoreboardComponent extends Component {
  render() {
    return (
      <div>
        <PlayerScoreComponent 
          address = { this.props.player1.address }
          score = { this.props.player1.score }
          maxScore = {this.props.maxScore }
        />
        <PlayerScoreComponent 
          address = { this.props.player2.address }
          score = { this.props.player2.score }
          maxScore = {this.props.maxScore }
        />
      </div>
    );
  }
}

export default ScoreboardComponent;
