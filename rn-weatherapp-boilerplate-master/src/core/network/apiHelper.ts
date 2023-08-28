import { API_BASE_URL, API_KEY } from '@env';
import {
  AppEndPointsType,
  GetReqType,
  ParamDataType,
  ReqDataType,
} from './types';

console.log("Base Url", API_BASE_URL);
console.log("API_KEY", API_KEY);

export const EndPoints: AppEndPointsType = {
  currentWeather: '/data/2.5/weather',
  dailyForecast: '/data/2.5/forecast/daily',
  getGeoCode: '/geo/1.0/direct',
  getIcon: 'img/wn',
};

const encodeQueryParams = (data: ReqDataType) => {
  const ret = [];
  for (let d in data) {
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }
  return ret.join('&');
};
export const getRequestObject = (
  url: string,
  data: ParamDataType,
): GetReqType => {
  const getParams = encodeQueryParams({ ...data, appid: API_KEY });
  return {
    url: API_BASE_URL + url + '?' + getParams,
    option: { method: 'GET' },
  };
};