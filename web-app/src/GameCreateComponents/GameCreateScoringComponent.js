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
          value = { this.props.win }
          onChange = { this.handleChange }
        />
        {' '}
        <input
          type = "text"
          greed_points = ""
          value = { this.props.greed }
          onChange = { this.handleChange }
        />
        {' '}
        <input
          type = "text"
          mutual_points = ""
          value = { this.props.mutual }
          onChange = { this.handleChange }
        />
        {' '}
        <input
          type = "text"
          mutual_greed_points = ""
          value = { this.props.mutual_greed }
          onChange = { this.handleChange }
        />
      </div>
    );
  }
}

export default GameCreateScoringComponent;
