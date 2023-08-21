import React from 'react';
import Home from './Home';
import renderer from 'react-test-renderer';

describe('Home', () => {
  it('should render Home component', () => {
    const home = renderer.create(<Home />).toJSON();
    expect(home).toMatchSnapshot();
  });
});
