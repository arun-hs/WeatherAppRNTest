import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/redux/store';
import {deviceWidth, deviceHeight} from '../Dimensions';

const Forecast = (props: any): JSX.Element => {
  const { name } = props.route.params;
  const [data, setData] = useState(); //to hold service response
  // const getAppState = (state: RootState) => state.appLoaded;
  // const appState = useSelector((state: RootState) => getAppState(state));

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=680f2d0cd5a9a46a0ba9be914dfe3a83`,
    )
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);
  
  const Data = ({title, value}: {title: string, value: string | number}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white', fontSize: 22}}>{title}</Text>
      <Text style={{color: 'white', fontSize: 22}}>{value}</Text>
    </View>
  );
  
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <View>
        {data ? (
          <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: deviceHeight - 100,
          }}>
            <View>
              <Text style={{color: 'white', fontSize: 40}}>{name}</Text>
              <Text style={{fontSize: 22, color: 'white', textAlign:"center"}}>
                {data['weather'][0]['main']}
              </Text>
            </View>

            <Text style={{color: 'white', fontSize: 64}}>
              {(data['main']['temp'] - 273).toFixed(2)}&deg; C
            </Text>

            <View>
            <Text style={{color: 'white', fontSize: 22, marginBottom: 16}}>Weather Details</Text>
            <View style={{width: deviceWidth - 60}}>
              <Data value={data['wind']['speed']} title="Wind" />
              <Data value={data['main']['pressure']} title="Pressure" />
              <Data value={`${data['main']['humidity']}%`} title="Humidity" />
              <Data value={data['visibility']} title="Visibility" />
            </View>
            </View>

          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Forecast;
