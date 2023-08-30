import { View, Text, FlatList, Image, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/redux/store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ForecastResponse, GetCityResponse, WeatherResponse } from '../../types/types';
import { addCityToWatchlist, removeCityToWatchlist } from '../../core/redux/actions/appActions';
import Utils from '../../utils/utils';
import { ForecastStyle } from './styles';
import Styles from '../../styles/styles';
import ErrorInfo from '../../components/errorInfo/errorInfo';
import { AppTestIds } from '../../utils/testUtils/testIds';

const Forecast = () => {
  const getAppState = (state: RootState) => state.App;
  const getWeather = (state: RootState) => state.weather;
  const dispatch = useAppDispatch();

  const { currentGeoLocation, selectedLocation } = useSelector(
    (state: RootState) => getAppState(state),
  );
  const { currentWeatherInformation, selectedLocationWeather, selectedLocationForecastInformation } =
    useAppSelector(getWeather);

  // useEffect(() =>
  //   console.log("selectedLocationWeather ->", selectedLocationWeather)
  // )

  const addCityToFavourites = (city: GetCityResponse) => {
    console.log("Before",currentWeatherInformation?.isWatchlist, currentWeatherInformation?.name)
    currentWeatherInformation?.isWatchlist ? true : true//= city.isWatchlist
    city.isWatchlist
      ? dispatch(removeCityToWatchlist(city))
      : dispatch(addCityToWatchlist(city));

      console.log("After",currentWeatherInformation?.isWatchlist, currentWeatherInformation?.name)
  };

  //5 days forecast flatlist items
  const renderForecastItem = (
    weatherInfo: WeatherResponse,
    index: number,
  ) => {
    const { dayName } = Utils.formatUnixDateToReadable(weatherInfo.dt);
    return (
      <View
        style={[Styles.flex1, ForecastStyle.forecastTileStyle, Styles.tileBackgroundColor]}
        key={index}
        testID={AppTestIds.ForecastScreenWeatherView}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{dayName}</Text>
        </View>
        <View style={Styles.flex1}>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', width:140}}>
            <Image
              source={{
                uri: Utils.loadWeatherIcons(weatherInfo?.weather[0].icon),
              }}
              style={Styles.weatherStatusIconStyle}
            />
            <Text style={{ fontSize: 16, color: 'black', textAlign: "center" }}>
              {weatherInfo?.weather[0].main} -{' '}
              {weatherInfo?.weather[0].description}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  //generating forecast flatlist 
  const weatherForecastList = (weather: ForecastResponse) => {
    return (
      <FlatList
        data={weather.list}
        renderItem={({ item, index }) => renderForecastItem(item, index)}
        horizontal={true}
        style={Styles.paddingVertical16}
        testID={AppTestIds.ForecastWeatherList}
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
    <View style={Styles.flex1} testID={AppTestIds.ForecastView}>
      <View style={[Styles.flex1, Styles.appBackgroundThemeColor, Styles.padding_v_h_20]}>
        {selectedLocationForecastInformation ? (
          <View style={[Styles.flex1, Styles.appBackgroundThemeColor]}>
            
            {selectedLocation ? (
            <View>
              <Pressable
                style={[Styles.mediumIcon]}
                onPress={() => addCityToFavourites(selectedLocation as GetCityResponse)}
                testID={AppTestIds.FavouriteIconPressable}>
                <Image
                  source={
                    selectedLocation?.isWatchlist
                      ? require('../../assets/images/favouriteSelected.png')
                      : require('../../assets/images/favourite.png')
                  }
                  style={[Styles.mediumIcon]}
                />
              </Pressable>
            </View>) : null }

            <View style={[Styles.flex1, Styles.padding_t_b_10]}>
              <Text style={{ color: 'white', fontSize: 40, textAlign: "center" }}>{selectedLocationWeather?.name}</Text>
              <Text style={{ fontSize: 22, color: 'white', textAlign: "center" }}>
                {selectedLocationWeather?.weather[0].main}
              </Text>
              <Text style={{ color: 'white', fontSize: 64, textAlign: "center" }}>
                {Utils.getRoundOfTemp(selectedLocationWeather?.main.temp as string)}
              </Text>
            </View>

            <View style={[Styles.flex1, Styles.padding_t_b_10]}>
              <Text style={{ color: 'white', fontSize: 22, paddingBottom: 5, paddingTop:5, fontWeight: 'bold' }}>Weather Details:</Text>
              <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Data value={Utils.getRoundOfTemp(selectedLocationWeather?.main.temp_min as string)} title="Min Temp" />
                <Data value={Utils.getRoundOfTemp(selectedLocationWeather?.main.temp_max as string)} title="Max Temp" />
                <Data value={Utils.getRoundOfTemp(selectedLocationWeather?.main.feels_like as string)} title="Feels like" />
                <Data value={`${selectedLocationWeather?.main.humidity}%`} title="Humidity" />
              </View>
            </View>

            <View style={[Styles.flex2, Styles.padding_t_b_10]}>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
                5 Day's Forecast:
              </Text>
              {weatherForecastList(selectedLocationForecastInformation)}
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
