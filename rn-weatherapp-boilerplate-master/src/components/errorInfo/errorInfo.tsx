import { View, Text } from 'react-native';
import React from 'react';

const ErrorInfo = () => {
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center',}}>
      <Text style={{fontSize: 22, color: 'yellow'}}>
        Something went wrong. Please try again.
      </Text>
    </View>
  );
};

export default ErrorInfo;
