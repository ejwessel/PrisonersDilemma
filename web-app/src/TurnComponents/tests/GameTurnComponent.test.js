import React from 'react';
import ReactDOM from 'react-dom';
import GameTurnsComponent from '../GameTurnsComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameTurnsComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
