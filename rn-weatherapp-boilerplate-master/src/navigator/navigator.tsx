import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Forecast from '../screens/forecast/forecast';
import { Image, View } from 'react-native';
import Styles from '../styles/styles';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const getTabIcon = (tabName: string, focused: boolean) => {
  return (
    <View>
      <Image
        source={
          tabName === 'Home'
            ? require('../assets/images/hot.png')
            : require('../assets/images/weather-app.png')
        }
        style={[
          Styles.tabIconStyle,
          focused ? Styles.activeTab : Styles.inActiveTab,
        ]}
      />
    </View>
  );
};

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName={'Home'}
//       screenOptions={{ headerShown: false }}>
//       <Tab.Screen
//         name={'Home'}
//         component={Home}
//         options={{
//           tabBarIcon: ({ focused }) => getTabIcon('Home', focused),
//         }}
//       />
//       <Tab.Screen
//         name={'Forecast'}
//         component={Forecast}
//         options={{
//           tabBarIcon: ({ focused }) => getTabIcon('Forecast', focused),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Forecast" component={Forecast}/>
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <SafeAreaView edges={['left']} style={[Styles.container]}>
        <RootStackNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Navigator;
