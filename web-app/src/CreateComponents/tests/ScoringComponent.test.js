import React from 'react';
import ReactDOM from 'react-dom';
import ScoringComponent from '../ScoringComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ScoringComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
