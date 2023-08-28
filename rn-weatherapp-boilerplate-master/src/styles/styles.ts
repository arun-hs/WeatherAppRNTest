import { ImageStyle, ViewStyle } from 'react-native';

const Styles = {
  tabIconStyle: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  } as ImageStyle,
  mediumIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  } as ImageStyle,
  weatherIconStyle: {
    height: 78,
    width: 78,
    resizeMode: 'contain',
  } as ImageStyle,
  activeTab: {
    opacity: 1,
  },
  inActiveTab: {
    opacity: 0.5,
  },
  container: {
    flex: 1,
  },
  topBarContainer: {
    height: 56,
    backgroundColor: 'white',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  whiteBackgroundColor:{
    backgroundColor: 'white',
  },
  lightGrayBackgroundColor:{
    backgroundColor: 'lightgray',
  },
  heading: {
    fontSize: 16,
    color:'black',
  },
  formError: {
    fontSize: 10,
    color: 'red',
  },
  paddingVertical16: {
    paddingVertical: 16,
  },
  paddingHorizontal8: {
    paddingHorizontal: 8,
  },
  marginLeft8: {
    marginLeft: 8,
  },
  textCenter: {
    alignItems: 'center',
  } as ViewStyle,
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
};

export default Styles;

