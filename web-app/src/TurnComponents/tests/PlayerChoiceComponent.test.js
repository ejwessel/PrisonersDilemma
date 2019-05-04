import React from 'react';
import ReactDOM from 'react-dom';
import GameTurnsPlayerChoiceComponent from '../GameTurnsPlayerChoiceComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameTurnsPlayerChoiceComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
