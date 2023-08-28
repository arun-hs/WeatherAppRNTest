// import { ASSET_BASE_URL } from '@env';
import { EndPoints } from '../core/network/apiHelper';
import { AppConstants } from '../config/constants';

const loadWeatherIcons = (iconId: string) => {
  return "http://openweathermap.org" + '/' + EndPoints.getIcon + `/${iconId}.png`;
};

const getRoundOfTemp = (temp: string) => {
  return `${
    Math.round(parseInt(temp, 10)) + ' ' + AppConstants.Celsius.symbol
  }`;
};

const dateToReadable = (date: Date) => {
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
  });
  return {
    day: date.getDay(),
    dayName: dateStr.split(' ')[1],
    month: date.getMonth(),
    monthName: dateStr.split(' ')[0],
    year: date.getFullYear().toString().substring(2),
  };
};

const formatUnixDateToReadable = (unixDt: number) => {
  const d = new Date(unixDt * 1000);
  return dateToReadable(d);
};

export default {
  loadWeatherIcons,
  getRoundOfTemp,
  formatUnixDateToReadable,
  dateToReadable,
};
