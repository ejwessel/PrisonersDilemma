import React, { Component } from 'react';

class JoinComponent extends Component {

  render() {
    return (
      <form>
        <label>Contract Address:</label>
        {' '}
        <input
          type = "text"
          contract_address = ""
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

export default JoinComponent;
