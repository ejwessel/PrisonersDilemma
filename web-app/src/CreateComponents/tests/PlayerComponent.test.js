import React from 'react';
import ReactDOM from 'react-dom';
import PlayerComponent from '../PlayerComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlayerComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
