import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { appLoaded } from '../../core/redux/actions/appActions';
import Icon from 'react-native-vector-icons/Ionicons';
import Favourites from '../favourites/favourites';
import Forecast from '../forecast/forecast';
import {deviceHeight} from '../Dimensions';

const Home = (props: any): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appLoaded());
  });

  const [city, setCity] = useState('');

  const cities = [
    {
      name: 'London',
      image: require('../../assets/images/tile.png'),
    },
    {
      name: 'Norwich',
      image: require('../../assets/images/tile.png'),
    },
    {
      name: 'Mumbai',
      image: require('../../assets/images/tile.png'),
    },
    {
      name: 'San Francisco',
      image: require('../../assets/images/tile.png'),
    },
    {
      name: 'New Jersey',
      image: require('../../assets/images/tile.png'),
    },
  ];

  return (
    <View style={{ flex:1, backgroundColor: 'red' }}>
      <View style={{ paddingHorizontal: 20, marginTop:deviceHeight / 15, marginBottom:deviceHeight / 10 }}>
        <View
          style={{
            backgroundColor: 'black',
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 16,
          }}>
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
              placeholderTextColor="white"
              style={{ paddingHorizontal: 10, color: 'white', fontSize: 22 }}
            />
            <TouchableOpacity onPress={() => props.navigation.navigate('Forecast', {name: city})}>
              <Image
                source={require('../../assets/images/search.png')}
                style={{height: 22, width: 22, borderRadius: 0}}
              />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={{ backgroundColor: 'gray', marginTop: 40, marginBottom: 20, borderRadius: 16 }} onPress={() => props.navigation.navigate('Forecast', {name: city})}>
              <Text style={{color: 'white', fontSize: 30, textAlign:"center"}}>Current City</Text>
              <Text style={{fontSize: 30, color: 'white', textAlign:"center"}}>20&deg; C</Text>
          </TouchableOpacity>

          <Text style={{color: 'white', fontSize: 25, paddingHorizontal: 10, marginTop: 50, marginBottom: 20}}>
            Favourites:
          </Text>
          <FlatList
          horizontal
            data={cities}
            renderItem={({item}) => (
              <Favourites name={item.name} image={item.image} navigation={props.navigation} />
            )}
          />

        </View>
      </View>
    </View>
  );
};

export default Home;
