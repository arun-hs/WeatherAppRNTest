import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Favourites from '../favourites/favourites';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../core/redux/store';
import { useNavigation } from '@react-navigation/native';
import { GetCityResponse, WeatherResponse } from '../../types/types';
import { AppConstants } from '../../config/constants';
import { weatherActions } from '../../core/redux/reducers/appReducer';
import { appLoaded, getCity, getCurrentWeatherInfo, getSelectedLocationWeatherForecast, getSelectedLocationWeatherInfo, updateSelectedCity } from '../../core/redux/actions/appActions';
import ErrorInfo from '../../components/errorInfo/errorInfo';
import Utils from '../../utils/utils';
import CarouselTile from '../../components/carouselTile/carouselTile';
import Styles from '../../styles/styles';

const Home = (props: any): JSX.Element => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [city, setCity] = useState('');
  
  // const [searchText, setSearchText] = useState('');//onSearchBarTextDidChange
  const [validInput, setValidInput] = useState(true);

  const getWeather = (state: RootState) => state.weather; //From Redux it updates data after async call"
  const getAppState = (state: RootState) => state.App;

  const { currentWeatherInformation, selectedLocationWeather } =
    useAppSelector(getWeather);
  const { currentGeoLocation, selectedLocation } = useAppSelector(getAppState);

  const { searchCities, loading } = useAppSelector(getWeather);
  const { favouriteLocations } = useAppSelector(getAppState);

  this.cityTextInput = React.createRef();
  
  useEffect(() => {
    dispatch(appLoaded());
    if (currentGeoLocation) {
      dispatch(
        getCurrentWeatherInfo({
          lat: currentGeoLocation?.coords.latitude,
          lon: currentGeoLocation?.coords.longitude,
          units: AppConstants.Celsius.value,
        }),
      );
    }
  }, [currentGeoLocation, dispatch, selectedLocation]);

  //on search icon tap event
  const searchCity = () => {
    if (city !== '' && city !== null && city !== undefined) {
      console.log("city name:" + city)
      setValidInput(true);
      dispatch(getCity({ q: city }));
    } else {
      setValidInput(false);
    }
    this.cityTextInput.current.clear(); // clearing search bar post search tap event/action
  };

  //for forecast
  const selectCity = (city: GetCityResponse) => {
    console.log("inside selectCity")
    dispatch(updateSelectedCity(city));
    
    fetchWeatherAndForecastInfo(city.lat, city.lon);
  };

  //splitted above selectCity method so as to suit for navigation for current loc by currentGeoLocation obj lat long innstead GetCityResponse all the time...
  const fetchWeatherAndForecastInfo = (latitude: number, longitude:number) => {
    console.log("inside fetchWeatherAndForecastInfo")
    console.log("input city name:",latitude, longitude)
    dispatch(
      getSelectedLocationWeatherInfo({
        lat: latitude,
        lon: longitude,
        units: AppConstants.Celsius.value,
      }),
    );
    dispatch(
      getSelectedLocationWeatherForecast({
        lat: latitude,
        lon: longitude,
        units: AppConstants.Celsius.value,
        cnt: 5,
      }),
    );
    dispatch(weatherActions.clearSearchCity());
    
    navigation.navigate('Forecast');
  };

  //toDo:
  const renderWeatherDetails = (weatherInfo: WeatherResponse) => {
    return (
      <View>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', paddingBottom: 10 }}>
          Current location weather details
        </Text>
        <TouchableOpacity style={{ backgroundColor: 'gray', borderRadius: 16 }} onPress={() => fetchWeatherAndForecastInfo(currentGeoLocation?.coords.latitude, currentGeoLocation?.coords.longitude)}>
          <Text style={{ color: 'white', fontSize: 30, textAlign: "center" }}>{weatherInfo?.name}</Text>
          <Text style={{ fontSize: 30, color: 'white', textAlign: "center" }}>{Utils.getRoundOfTemp(weatherInfo?.main.temp)}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 20 }}>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          {currentWeatherInformation ? (
            renderWeatherDetails(currentWeatherInformation)
          ) : (
            <View>
                <Text style={{ fontSize: 16, color: 'lightgray', paddingHorizontal: 20, paddingVertical: 30}}>Please enable location access to view your current location weather details tile here.</Text>
            </View>
          )}
        </View>

        <View style={{ flex: 3, backgroundColor: 'black' }}>
          <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
            Search city by name
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'white',
              marginTop: 16,
              paddingHorizontal: 10,
            }}>
            <TextInput
              ref={this.cityTextInput}
              value={city}
              onChangeText={val => setCity(val)}
              placeholder="Search City"
              placeholderTextColor={'lightgray'}
              style={{ paddingHorizontal: 10, color: 'white', fontSize: 22 }}
            />
            {/* {!validInput ? (
              <Text style={Styles.formError}>
                ! Please provide valid city name.
              </Text>
            ) : (
              <View />
            )} */}
            
            <TouchableOpacity onPress={() => searchCity()}>
              <Image
                source={require('../../assets/images/search.png')}
                style={{ height: 22, width: 22, borderRadius: 0 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 10, paddingBottom: 10 }}>
            {loading ? (
              <Text style={{ fontSize: 26, color: 'white' }}> Loading... </Text>
            ) : (
              <View />
            )}
            {searchCities && searchCities.length > 0 ? (
              <FlatList
                horizontal={false}
                data={searchCities}
                renderItem={({ item }) => (
                  <CarouselTile title={item.name} country={item.country} onCarouselTilePress={() => selectCity(item)}/>
                )}
              />
            ) : (
              <View>
                <Text style={{ fontSize: 16, color: 'yellow' }}>Please enter a valid city name in the search bar to see this city tile.</Text>
              </View>
            )}
          </View>
        </View>
        <View style={{ flex: 2, backgroundColor: 'black' }}>
          <Text style={{ color: 'white', fontSize: 25, paddingHorizontal: 10, fontWeight: 'bold' }}>
            Favourites
          </Text>

          {favouriteLocations.length > 0 ? (
          <FlatList
            style={{ paddingTop: 10, paddingBottom: 10 }}
            horizontal={true}
            data={favouriteLocations}
            renderItem={({ item }) => (
              <CarouselTile title={item.name} country="" onCarouselTilePress={() => selectCity(item)}/>
            )}
          />
          ) : (
            <View>
              <Text style={{ fontSize: 16, color: 'lightgray', paddingHorizontal: 20, paddingVertical: 30}}>No Favourite cities to show. You can add city of your choice to favouries in the details screen.</Text>
            </View>
          )}
        </View>

      </View>
    </View>
  );
};

export default Home;