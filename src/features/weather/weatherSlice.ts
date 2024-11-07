import { createSlice } from '@reduxjs/toolkit';
import { weatherAPI } from './weatherAPI';
import { WeatherState } from '../../types';

// Функция для загрузки данных из localStorage
const loadRecordsFromLocalStorage = (): WeatherState['records'] => {
  try {
    const serializedData = localStorage.getItem('weatherRecords');
    return serializedData ? JSON.parse(serializedData) : [];
  } catch (e) {
    console.error("Failed to load records from localStorage", e);
    return [];
  }
};

// Функция для сохранения данных в localStorage
const saveRecordsToLocalStorage = (records: WeatherState['records']) => {
  try {
    const serializedData = JSON.stringify(records);
    localStorage.setItem('weatherRecords', serializedData);
  } catch (e) {
    console.error("Failed to save records to localStorage", e);
  }
};

const initialState: WeatherState = {
  records: loadRecordsFromLocalStorage(),
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      weatherAPI.endpoints.getWeatherRecords.matchFulfilled,
      (state, action) => {
        state.records = action.payload;
        saveRecordsToLocalStorage(state.records); // Сохраняем в localStorage
      }
    );

    builder.addMatcher(
      weatherAPI.endpoints.addWeatherRecord.matchFulfilled,
      (state, action) => {
        state.records.push(action.payload);
        saveRecordsToLocalStorage(state.records); // Сохраняем в localStorage
      }
    );

    builder.addMatcher(
      weatherAPI.endpoints.deleteWeatherRecord.matchFulfilled,
      (state, action) => {
        state.records = state.records.filter(record => record.id !== action.meta.arg.originalArgs);
        saveRecordsToLocalStorage(state.records); // Сохраняем в localStorage
      }
    );
  },
});

export default weatherSlice.reducer;
