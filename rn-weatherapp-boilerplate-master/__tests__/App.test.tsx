/**
 * @format
 */

import 'react-native';
import App from '../src/App';

// Note: import explicitly to use the types shiped with jest.
import { it } from '@jest/globals';

// Note: test renderer must be required after react-native.

jest.mock('@react-navigation/bottom-tabs');

it('should be App', async () => {
  expect(App).toBeTruthy();
});
