import React from 'react';
import Home from './Home';
import { renderWithRedux } from '../../utils/testUtils/testUtils';
import { enableFetchMocks } from 'jest-fetch-mock';
import {
  mockCity,
  mockLocation,
  mockWeatherResponse,
} from '../../utils/testUtils/testMockData';
import { AppTestIds } from '../../utils/testUtils/testIds';
import { waitFor, fireEvent } from '@testing-library/react-native';
import {
  actionTypes,
  addCityToWatchlist,
  getCity,
  getCurrentWeatherInfo,
  getSelectedLocationWeatherInfo,
  updateCurrentLocation,
  updateSelectedCity,
} from '../../core/redux/actions/appActions';
import store from '../../core/redux/store';
import { AppConstants } from '../../constants/constants';

enableFetchMocks();

describe('Home', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse('[]');
  });

  let arg = {
    lat: mockLocation.coords.latitude,
    lon: mockLocation.coords.longitude,
    units: AppConstants.Celsius.value,
  };

  // looks like above beforeEach is not getting executed
  // it('should render Home component', () => {
  //   const { getByText } = renderWithRedux(<Home />);
  //   expect(getByText("Current location weather details")).toBeOnTheScreen();
  // });

  it('Receiving Current Geo location', async () => {
    const { update } = renderWithRedux(<Home />);
    const spy = jest.spyOn(store, 'dispatch');
    await waitFor(async () => {
      await store.dispatch(updateCurrentLocation(mockLocation));
      await update(<Home />);
    });
    expect(spy).toHaveBeenCalledWith(expect.any(Function));
  });

  //On load getting current loc'n weather details
  it('Load current weather information', async () => {
    fetchMock.mockResponse(JSON.stringify(mockWeatherResponse));
    waitFor(async () => {
      const weather = await store.dispatch(getCurrentWeatherInfo(arg));
      expect(weather.payload).toStrictEqual(mockWeatherResponse);
    });
  });

  it('Search city', async () => {
    fetchMock.mockResponse(JSON.stringify([mockCity]));
    const { getByTestId, getAllByTestId } = renderWithRedux(<Home />);
    const textInp = getByTestId(AppTestIds.SearchTextInput);
    const button = getByTestId(AppTestIds.SearchPressable);
    await fireEvent.changeText(textInp, mockCity.name);
    await fireEvent.press(button);
    await store.dispatch(getCity({ q: mockCity.name }));
    waitFor(() => {
      expect(getAllByTestId(AppTestIds.SearchResultsList).length).toBe(1);
    });
  });

  it('select city', async () => {
    const updateSelectCitySpy = jest.spyOn(store, 'dispatch');
    const { getByTestId } = renderWithRedux(<Home />);
    const selectCityPressable = getByTestId(AppTestIds.SearchSelectCity);
    waitFor(async () => {
      await fireEvent.press(selectCityPressable, mockCity);
    });
    waitFor(() => {
      expect(updateSelectCitySpy).toHaveBeenCalledWith({
        type: actionTypes.UPDATE_SELECTED_CITY,
        payload: mockCity,
      });
      expect(updateSelectCitySpy).toHaveBeenCalledWith({
        type: 'WEATHER/clearSearchCity',
      });
    });
  });

  it('Favourite location list', async () => {
    store.dispatch(addCityToWatchlist(mockCity[0]));
    const { getAllByTestId } = renderWithRedux(<Home />);
    waitFor(() => {
      expect(
        getAllByTestId(AppTestIds.SearchWatchlist).length,
      ).toBeGreaterThanOrEqual(1);
    });
  });
});