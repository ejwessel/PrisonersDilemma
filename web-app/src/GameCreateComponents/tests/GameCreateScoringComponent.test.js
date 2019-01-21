import React from 'react';
import ReactDOM from 'react-dom';
import GameCreateScoringComponent from '../GameCreateScoringComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameCreateScoringComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
