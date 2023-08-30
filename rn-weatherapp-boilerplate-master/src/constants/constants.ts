import { Units } from '../types/types';

export const TemperatureUnits = {
  Farenheit: 'imperial' as Units,
  Celsius: 'metric' as Units,
};
export const AppConstants = {
  Farenheit: {
    value: TemperatureUnits.Farenheit,
    label: 'Fahrenheit',
    symbol: '° F',
  },
  Celsius: {
    value: TemperatureUnits.Celsius,
    label: 'Celsius',
    symbol: '° C',
  },
  apiSuccess: 200,
};
