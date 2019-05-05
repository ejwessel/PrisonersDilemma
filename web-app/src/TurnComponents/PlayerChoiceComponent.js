import React, { Component } from 'react';

class PlayerChoiceComponent extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitChoice(1);
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

export default PlayerChoiceComponent;
