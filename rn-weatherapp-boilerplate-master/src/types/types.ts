export interface Weather {
  id: string;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherDetail {
  temp: string;
  feels_like: string;
  temp_min: string;
  temp_max: string;
  humidity: number;
}

export interface WeatherResponse extends APIResponse {
  weather: Weather[];
  main: WeatherDetail;
  name: string;
  dt: number;
  coord: WeatherCoordinates;
  sys: WeatherSysDetails;
}

export interface WeatherSysDetails {
  country: string;
}

export interface WeatherCoordinates {
  lat: number;
  lon: number;
}

export interface APIResponse {
  cod: number | string;
  [key: string]: any;
}

export interface ForecastResponse extends APIResponse {
  list: WeatherResponse[];
  cnt: number;
}

export interface GetCityResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
  isWatchlist?: boolean;
}

export type Units = 'imperial' | 'metric' | 'standard';
