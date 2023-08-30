import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../core/redux/store';
import { useNavigation } from '@react-navigation/native';
import { GetCityResponse, WeatherResponse } from '../../types/types';
import { AppConstants } from '../../constants/constants';
import { weatherActions } from '../../core/redux/reducers/appReducer';
import { appLoaded, getCity, getCurrentWeatherInfo, getSelectedLocationWeatherForecast, getSelectedLocationWeatherInfo, updateSelectedCity } from '../../core/redux/actions/appActions';
import Utils from '../../utils/utils';
import CarouselTile from '../../components/carouselTile/carouselTile';
import { AppTestIds } from '../../utils/testUtils/testIds';
import { HomeStyle } from './styles';
import Styles from '../../styles/styles';

const Home = () => {
  // const navigation = useNavigation();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const [city, setCity] = useState(''); //to hold search bar input   
  // const [searchText, setSearchText] = useState('');//onSearchBarTextDidChange
  const [validInput, setValidInput] = useState(true);

  const getWeather = (state: RootState) => state.weather; //From Redux it updates data after async call
  const getAppState = (state: RootState) => state.App;

  const { currentWeatherInformation, selectedLocationWeather } = useAppSelector(getWeather);
  const { currentGeoLocation, selectedLocation } = useAppSelector(getAppState);

  const { searchCities, loading } = useAppSelector(getWeather);
  const { favouriteLocations } = useAppSelector(getAppState);
  
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
    setCity('') // clearing search bar post search 
  };

  //for forecast
  const fetchAndNavigateToForecastScreen = (city: GetCityResponse, isCurrentLocation: boolean) => {
    console.log("inside fetchAndNavigateToForecastScreen")
    console.log(city.isWatchlist, city.name)
    dispatch(updateSelectedCity(isCurrentLocation ? null : city));

    console.log(selectedLocation?"selectedLocation":"selectedLocation is null")
    dispatch(
      getSelectedLocationWeatherInfo({
        lat: city.lat,
        lon: city.lon,
        units: AppConstants.Celsius.value,
      }),
    );
    dispatch(
      getSelectedLocationWeatherForecast({
        lat: city.lat,
        lon: city.lon,
        units: AppConstants.Celsius.value,
        cnt: 5,
      }),
    );
    dispatch(weatherActions.clearSearchCity());
    
    navigation.navigate('Forecast');
  };

  // Render user's current location details 
  const renderCurrentLocWeatherDetails = (weatherInfo: WeatherResponse) => {
    const currentCity: GetCityResponse = { name:currentWeatherInformation?.name as string, 
      lat:currentWeatherInformation?.coord.lat as number, 
      lon:currentWeatherInformation?.coord.lon as number,
      country:currentWeatherInformation?.sys.country as string,
      state:""
    };  
    //{[Styles.container, ForecastStyle.cardStyle, Styles.forecastFlatListBackgroundColor]}
    return (
      <View testID={AppTestIds.HomeView}>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', paddingBottom: 5 }}>
          Current location weather details
        </Text>
        <TouchableOpacity style={HomeStyle.currentLocationTile} onPress={() => fetchAndNavigateToForecastScreen(currentCity, true)}>
          <Text style={{ color: 'white', fontSize: 30, textAlign: "center" }}>{weatherInfo?.name}</Text>
          <Text style={{ fontSize: 30, color: 'white', textAlign: "center" }}>{Utils.getRoundOfTemp(weatherInfo?.main.temp)}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={Styles.flex1} testID={AppTestIds.HomeScreenWeatherView}>
      <View style={[Styles.flex1, Styles.appBackgroundThemeColor, Styles.padding_v_h_20]}>
        <View style={{ flex: 1, paddingBottom:20, paddingTop:5 }}>
          {currentWeatherInformation ? (
            renderCurrentLocWeatherDetails(currentWeatherInformation)
          ) : (
            <View>
                <Text style={{ fontSize: 16, color: 'lightgray', paddingHorizontal: 20, paddingVertical: 30}}>Please enable location access to view your current location weather details tile here.</Text>
            </View>
          )}
        </View>

        <View style={Styles.flex3}>
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
              value={city}
              onChangeText={val => setCity(val)}
              placeholder="Search City"
              placeholderTextColor={'lightgray'}
              style={{ paddingHorizontal: 10, color: 'white', fontSize: 22 }}
              testID={AppTestIds.SearchTextInput}
            />
            {/* {!validInput ? (
              <Text style={Styles.formError}>
                ! Please provide valid city name.
              </Text>
            ) : (
              <View />
            )} */}
            
            <TouchableOpacity onPress={() => searchCity()} testID={AppTestIds.SearchPressable}>
              <Image
                source={require('../../assets/images/search.png')}
                style={HomeStyle.searchIcon}
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
                  <CarouselTile title={item.name} country={item.country} onCarouselTilePress={() => fetchAndNavigateToForecastScreen(item, false)}/>
                )}
                testID={AppTestIds.SearchResultsList}
              />
            ) : (
              <View>
                <Text style={{ fontSize: 16, color: 'yellow' }}>Please enter a valid city name in the search bar & search, to view the tappable city tile here.</Text>
              </View>
            )}
          </View>
        </View>
        <View style={Styles.flex2}>
          <Text style={{ color: 'white', fontSize: 25, paddingHorizontal: 10, fontWeight: 'bold' }}>
            Favourites
          </Text>

          {favouriteLocations.length > 0 ? (
          <FlatList
            style={{ paddingTop: 10, paddingBottom: 10 }}
            horizontal={true}
            data={favouriteLocations}
            renderItem={({ item }) => (
              <CarouselTile title={item.name} country="" onCarouselTilePress={() => fetchAndNavigateToForecastScreen(item, false)}/>
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