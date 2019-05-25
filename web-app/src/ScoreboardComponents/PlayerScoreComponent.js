import React, { Component } from 'react';

class PlayerScoreComponent extends Component {
  render() {
    return (
      <div>
        <label>Player { this.props.address} Score</label>
        {' '}
        <input
          type = "text"
          value = { this.props.score }
          readOnly
        />
        {' '}
        of
        {' '}
        <input
          type = "text"
          value = { this.props.maxScore }
          readOnly
        />
      </div>
    );
  }
}

export default PlayerScoreComponent;
