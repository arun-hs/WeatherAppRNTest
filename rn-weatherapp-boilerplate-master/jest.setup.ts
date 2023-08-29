import { renderWithRedux } from './src/utils/testUtils/testUtils';
import { jest } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
// jest.mock('@react-native-async-storage/async-storage', () =>
//   require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
// );

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    getItem: async (...args) => args,
    setItem: async (...args) => args,
    removeItem: async (...args) => args,
  };
});
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});

jest.mock('@react-native-community/geolocation', () => ({
  addListener: jest.fn(),
  getCurrentPosition: jest.fn(),
  removeListeners: jest.fn(),
  requestAuthorization: jest.fn(() => Promise.resolve(true)),
  setConfiguration: jest.fn(),
  startObserving: jest.fn(),
  setRNConfiguration: jest.fn(),
  stopObserving: jest.fn(),
}));

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: (props: any) => props.children,
}));

global.renderWithRedux = renderWithRedux;
global.fetchMock = fetchMock;
