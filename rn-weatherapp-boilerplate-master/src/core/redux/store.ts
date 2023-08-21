import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AppReducer, { weatherReducer } from './reducers/appReducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PERSIST,
  REGISTER,
  PURGE,
  PAUSE,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const rootReducer = combineReducers({
  App: AppReducer,
  weather: weatherReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
