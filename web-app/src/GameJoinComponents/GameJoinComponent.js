import React, { Component } from 'react';

class GameJoinComponent extends Component {

  render() {
    return (
      <form>
        <label>Contract Address:</label>
        {' '}
        <input
          type = "text"
          contract_address = "contract address"
        />
        {' '}
        <input
          type = "button"
          value = "Join Game"
          onClick = { this.submitForm }
        />
      </form>
    );
  }
}

export default GameJoinComponent;
