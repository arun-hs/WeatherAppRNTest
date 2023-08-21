import { View, Text, ViewStyle, Image, Pressable } from 'react-native';
import React from 'react';
import { TopBarProps } from './types';
import { useNavigation } from '@react-navigation/native';
import Styles from '../../styles/styles';

const TopBar = ({ title }: TopBarProps) => {
  const navigation = useNavigation<any>();

  const openSearch = () => {
    navigation.navigate('Search');
  };
  return (
    <View style={[Styles.topBarContainer as ViewStyle]}>
    <View style={{flex: 1}}>
        <Text style={[Styles.heading]}>{title}</Text>
    </View>
    </View>
  );
};

export default TopBar;
