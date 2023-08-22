import Geolocation, {
    GeolocationResponse,
  } from '@react-native-community/geolocation';
  
  export const locationConfig = () => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'auto',
      locationProvider: 'auto',
    });
  };
  
  export const requestLocationAccess = () => {
    return new Promise((resolve, reject) => {
      Geolocation.requestAuthorization(
        () => {
          resolve(true);
        },
        e => {
          reject(e);
        },
      );
    });
  };
  
  export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position: GeolocationResponse) => {
          resolve(position);
        },
        error => {
          reject(error);
        },
      );
    });
  };
  