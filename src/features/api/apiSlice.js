import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    //creates function to send post request to /offer
    sendOffer: builder.mutation({
      query: (offer) => ({
        url: '/offer',
        method: 'POST',
        body: { offer },
      }),
    }),
  }),
});

export const { useSendOfferMutation } = apiSlice;
