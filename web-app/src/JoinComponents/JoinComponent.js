import React, { Component } from 'react';

class JoinComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      contractAddress: '0x0000000000000000000000000000000000000000'
    }

    this.handleContractAddress = this.handleContractAddress.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this)
  }

  handleContractAddress(event) {
    this.setState({contractAddress: event.target.value}) 
  }

  handleStartGame(event) {
    event.preventDefault();
    this.props.setContract(this.state.contractAddress);
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.handleStartGame }>
          <label>Contract Address:</label>
          {' '}
          <input
            type = "text"
            name = "contractAddress"
            placeholder = "Contact Address"
            onChange = { this.handleContractAddress }
          />
          <br/>
          <input
            type = "submit"
            value = "Join Game"
          />
        </form>
      </div>
    );
  }
}

export default JoinComponent;
