import React from 'react';
import ReactDOM from 'react-dom';
import PlayerChoiceComponent from '../PlayerChoiceComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlayerChoiceComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
