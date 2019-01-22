import React from 'react';
import ReactDOM from 'react-dom';
import GameEventLogComponent from '../GameEventLogComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameEventLogComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
