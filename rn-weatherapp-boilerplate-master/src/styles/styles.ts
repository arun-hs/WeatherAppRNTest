import { ImageStyle } from 'react-native';

const Styles = {
  tabIconStyle: {
    width: 22,
    height: 22,
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
  heading: {
    fontSize: 16,
    color:'black',
  }
};

export default Styles;

