import React, { Component } from 'react';

class GameTurnsPlayerChoiceComponent extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    console.log("does nothing yet");
    event.preventDefault();
    //TODO: move the state upwards
  }

  render() {
    return (
      <div> 
        <form onSubmit={ this.handleSubmit }>
          <label>Player # Turn</label>
          {' '}
          <input
            type = "text"
            contract_address = ""
            value = "address"
            readOnly
          />
          {' '}
          <select>
            <option value = "No Choice">No Choice</option>
            <option value = "Share">Share</option>
            <option value = "Take">Take</option>
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

export default GameTurnsPlayerChoiceComponent;
