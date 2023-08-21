export interface AppEndPointsType {
  currentWeather: string;
  dailyForecast: string;
  getGeoCode: string;
  getIcon: string;
}

export interface ParamDataType {
  [key: string]: any;
}

export interface ReqDataType extends ParamDataType {
  appid: string;
}

export interface ReqOptionsType {
  method: 'GET' | 'POST';
}
export interface GetReqType {
  url: string;
  option: ReqOptionsType;
}