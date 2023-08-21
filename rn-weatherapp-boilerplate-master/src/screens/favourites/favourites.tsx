import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {deviceHeight, deviceWidth} from '../Dimensions';

export default function Favourites({name, image, navigation}: {name: string, image: any, navigation: any}): JSX.Element {
    return (
      <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => navigation.navigate('Forecast', {name})}>
        <ImageBackground
          source={image}
          style={{height: deviceHeight / 5, width: deviceWidth / 2 - 50}}
          imageStyle={{borderRadius: 16}}
        />
        <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent:"center"}}>
          <Text
            style={{
              fontSize: 28,
              width: '100%',
              height: '100%',
              textAlign:"center",
              alignSelf: 'center',
              alignItems: 'center',
              textAlignVertical: 'center',
              color: 'black',
            }}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }