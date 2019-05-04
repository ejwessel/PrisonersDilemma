import React from 'react';
import ReactDOM from 'react-dom';
import GameCreateComponent from '../GameCreateComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameCreateComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
