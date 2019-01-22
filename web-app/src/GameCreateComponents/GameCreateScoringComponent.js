import React, { Component } from 'react';

class GameCreateScoringComponent extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    console.log("does nothing yet");
    event.preventDefault();
    //TODO: move the state upwards
  }

  render() {
    return (
      <div>
        <label>Scoring:</label>
        {' '}
        <input
          type = "text"
          win_score = ""
          value = "Win Score"
          onChange = { this.handleChange }
        />
        {' '}
        <input
          type = "text"
          greed_points = ""
          value = "Greed Points"
          onChange = { this.handleChange }
        />
        {' '}
        <input
          type = "text"
          mutual_points = ""
          value = "Mutual Points"
          onChange = { this.handleChange }
        />
        {' '}
        <input
          type = "text"
          mutual_greed_points = ""
          value = "Mutual Greed Points"
          onChange = { this.handleChange }
        />
      </div>
    );
  }
}

export default GameCreateScoringComponent;
