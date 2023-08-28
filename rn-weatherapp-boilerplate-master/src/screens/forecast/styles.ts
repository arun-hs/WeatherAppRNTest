import { StyleSheet } from "react-native";
import Styles from '../../styles/styles';

export const favouriteIconStyle = StyleSheet.create({
    topRightCorner: {
      ...StyleSheet.absoluteFillObject,
      alignSelf: 'flex-end',
      marginTop: -5,
      position: 'absolute', // add if dont work with above
    },
  });

export const ForecastStyle = {
  cardStyle: {
    Width: 140,
    elevation: 1,
    borderRadius: 16,
    ...Styles.paddingVertical16,
    ...Styles.paddingHorizontal8,
    ...Styles.marginLeft8,
    ...Styles.textCenter,
  },
};
