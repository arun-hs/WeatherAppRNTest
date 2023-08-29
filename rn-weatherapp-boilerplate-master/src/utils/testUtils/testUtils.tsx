import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';
import React, { PropsWithChildren } from 'react';
import store, { persistor } from '../../core/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export function renderWithRedux(
  renderedComponent: React.JSX.Element,
  renderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
  }
  return {
    store,
    ...render(renderedComponent, { wrapper: Wrapper, ...renderOptions }),
  };
}
