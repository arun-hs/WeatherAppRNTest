import { View, Text, FlatList, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/redux/store';
import Favourites from '../favourites/favourites';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ForecastResponse, GetCityResponse, WeatherResponse } from '../../types/types';
import { addCityToWatchlist, removeCityToWatchlist } from '../../core/redux/actions/appActions';
import Utils from '../../utils/utils';
import { ForecastStyle, favouriteIconStyle } from './styles';
import Styles from '../../styles/styles';
import ErrorInfo from '../../components/errorInfo/errorInfo';

const Forecast = () => {
  const getAppState = (state: RootState) => state.App;
  const getWeather = (state: RootState) => state.weather;
  const dispatch = useAppDispatch();

  const { currentGeoLocation, selectedLocation } = useSelector(
    (state: RootState) => getAppState(state),
  );
  const { selectedLocationWeather, selectedLocationForecastInformation } =
    useAppSelector(getWeather);

  useEffect(() =>
    console.log("selectedLocationWeather ->", selectedLocationWeather)
  )
  const updateCityWatchlist = (city: GetCityResponse) => {
    city.isWatchlist
      ? dispatch(removeCityToWatchlist(city))
      : dispatch(addCityToWatchlist(city));
  };

  //forecast flatlist in bottom
  const renderWeatherDetails = (
    weatherInfo: WeatherResponse,
    index: number,
  ) => {
    const { dayName } = Utils.formatUnixDateToReadable(weatherInfo.dt);
    return (
      <View
        style={[Styles.container, ForecastStyle.cardStyle, Styles.lightGrayBackgroundColor]}
        key={index}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{dayName}</Text>
        </View>
        <View style={Styles.container}>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', }}>
            <Image
              source={{
                uri: Utils.loadWeatherIcons(weatherInfo?.weather[0].icon),
              }}
              style={Styles.weatherIconStyle}
            />
            <Text style={{ fontSize: 16, color: 'black' }}>
              {weatherInfo?.weather[0].main} -{' '}
              {weatherInfo?.weather[0].description}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const weatherList = (weather: ForecastResponse) => {
    return (
      <FlatList
        data={weather.list}
        renderItem={({ item, index }) => renderWeatherDetails(item, index)}
        horizontal={true}
        style={Styles.paddingVertical16}
      />
    );
  };

  const Data = ({ title, value }: { title: string, value: string | number }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{ color: 'white', fontSize: 22 }}>{title}</Text>
      <Text style={{ color: 'white', fontSize: 22 }}>{value}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 20 }}>
        {selectedLocationForecastInformation ? (
          <View style={{ flex: 1, backgroundColor: 'red' }}>

            <View>
              <Pressable
                style={[Styles.mediumIcon]}
                onPress={() => updateCityWatchlist(selectedLocation as GetCityResponse)}>
                <Image
                  source={
                    selectedLocation?.isWatchlist
                      ? require('../../assets/images/favouriteSelected.png')
                      : require('../../assets/images/favourite.png')
                  }
                  style={[Styles.mediumIcon]}
                />
              </Pressable>
            </View>

            <View style={{ flex: 1, backgroundColor: '', paddingTop: 10, paddingBottom: 10 }}>
              <Text style={{ color: 'white', fontSize: 40, textAlign: "center" }}>{selectedLocationWeather?.name}</Text>
              <Text style={{ fontSize: 22, color: 'white', textAlign: "center" }}>
                {selectedLocationWeather?.weather[0].main}
              </Text>
              <Text style={{ color: 'white', fontSize: 64, textAlign: "center" }}>
                {Utils.getRoundOfTemp(selectedLocationWeather?.main.temp)}
              </Text>
            </View>

            <View style={{ flex: 1, backgroundColor: '' }}>
              <Text style={{ color: 'white', fontSize: 22, paddingBottom: 10, fontWeight: 'bold' }}>Weather Details:</Text>
              <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Data value={Utils.getRoundOfTemp(selectedLocationWeather?.main.temp_min)} title="Min Temp" />
                <Data value={Utils.getRoundOfTemp(selectedLocationWeather?.main.temp_max)} title="Max Temp" />
                <Data value={Utils.getRoundOfTemp(selectedLocationWeather?.main.feels_like)} title="Feels like" />
                <Data value={`${selectedLocationWeather?.main.humidity}%`} title="Humidity" />
              </View>
            </View>

            <View style={{ flex: 2, backgroundColor: '' }}>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
                5 Day's Forecast:
              </Text>
              {weatherList(selectedLocationForecastInformation)}
            </View>

          </View>
        ) : (
          <ErrorInfo />
        )}
      </View>
    </View>
  );
};

export default Forecast;
