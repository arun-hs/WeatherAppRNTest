import Styles from '../../styles/styles';

export const ForecastStyle = {
  forecastTileStyle: {
    Width: 140,
    elevation: 1,
    borderRadius: 16,
    ...Styles.paddingVertical16,
    ...Styles.paddingHorizontal8,
    ...Styles.marginLeft8,
    ...Styles.textCenter,
  },
};
