import { ImageStyle, ViewStyle } from 'react-native';

const Styles = {
  appTextColor:{
    color: 'white',
  },
  appBackgroundThemeColor:{
    backgroundColor:"red"
  },
  tileBackgroundColor:{
    backgroundColor: 'lightgray',
  },
  // tabIconStyle: {
  //   width: 22,
  //   height: 22,
  //   resizeMode: 'contain',
  // } as ImageStyle,
  mediumIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  } as ImageStyle,
  weatherStatusIconStyle: {
    height: 78,
    width: 78,
    resizeMode: 'contain',
  } as ImageStyle,
  // activeTab: {
  //   opacity: 1,
  // },
  // inActiveTab: {
  //   opacity: 0.5,
  // },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  padding_v_h_20: {
    paddingVertical: 20,
    paddingHorizontal: 20, 
  },
  padding_t_b_10: {
    paddingTop: 10,
    paddingBottom: 10, 
  },
  topBarContainer: {
    height: 56,
    backgroundColor: 'white',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
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

