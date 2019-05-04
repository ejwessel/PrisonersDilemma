import React from 'react';
import ReactDOM from 'react-dom';
import GameCreatePlayerComponent from '../GameCreatePlayerComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameCreatePlayerComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
