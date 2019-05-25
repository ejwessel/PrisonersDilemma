import React, { Component } from 'react';

class EventLogComponent extends Component {
  render() {
    return (
      <textarea rows = "20" cols = "50" value={ this.props.logger }></textarea>
    );
  }
}

export default EventLogComponent;
