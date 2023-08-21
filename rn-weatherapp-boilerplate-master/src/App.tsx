import React from 'react';
import Navigator from './navigator/navigator';
import { Provider } from 'react-redux';
import store from './core/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
