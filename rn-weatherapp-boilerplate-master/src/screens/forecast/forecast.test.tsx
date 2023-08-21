import React from 'react';
import Forecast from './forecast';
import renderer from 'react-test-renderer';

describe('Forecast', () => {
  it('should render Forecast component', () => {
    const forecast = renderer.create(<Forecast />).toJSON();
    expect(forecast).toMatchSnapshot();
  });
});
