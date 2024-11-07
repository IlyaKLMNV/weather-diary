import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WeatherRecord } from '../../types';

export const weatherAPI = createApi({
  reducerPath: 'weatherAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['WeatherRecords'],
  endpoints: (builder) => ({
    getWeatherRecords: builder.query<WeatherRecord[], void>({
      query: () => 'weatherRecords',
      providesTags: ['WeatherRecords'],
    }),
    addWeatherRecord: builder.mutation<WeatherRecord, Partial<WeatherRecord>>({
      query: (record) => ({
        url: 'weatherRecords',
        method: 'POST',
        body: record,
      }),
      invalidatesTags: ['WeatherRecords'],
    }),
    deleteWeatherRecord: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `weatherRecords/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WeatherRecords'],
    }),
    getUsers: builder.query<{ label: string; value: string }[], void>({
      query: () => 'users',
    }),
  }),
});


export const {
  useGetWeatherRecordsQuery,
  useAddWeatherRecordMutation,
  useDeleteWeatherRecordMutation,
  useGetUsersQuery,
} = weatherAPI;