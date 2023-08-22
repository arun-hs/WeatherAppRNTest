import React from 'react';
import Navigator from './navigator/navigator';
import { Provider } from 'react-redux';
import store, { persistor } from './core/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
