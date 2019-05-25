import React, { Component } from 'react';

class PlayerChoiceComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      playerChoice: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChoice = this.handleChoice.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitChoice(Number(this.state.playerChoice));
  }

  handleChoice(event) {
    this.setState({ playerChoice: event.target.value })
  }

  render() {
    return (
      <div> 
        <form onSubmit={ this.handleSubmit }>
          <label>Player Address: </label>
          {' '}
          <input
            type = "text"
            contract_address = { this.props.playerAddress }
            value = { this.props.playerAddress }
            style = {{ width:"300px" }}
            readOnly
          />
          {' '}
          <select onChange = { this.handleChoice }>
            <option value = "0">No Choice</option>
            <option value = "1">Share</option>
            <option value = "2">Take</option>
          </select>
          {' '}
          <input
            type = "submit"
            value = "Select Choice"
          />
        </form>
      </div>
    );
  }
}

export default PlayerChoiceComponent;
