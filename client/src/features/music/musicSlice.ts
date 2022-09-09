import { createApi } from '@reduxjs/toolkit/query/react';
import { MusicResponseDto } from '../../typings/music';
import { axiosInstance } from '../../utils/axios';

export const musicApi = createApi({
  reducerPath: 'musicApi/search',
  baseQuery: axiosInstance,
  endpoints: (builder) => ({
    getMusicByKeyword: builder.query<MusicResponseDto[], string>({
      query: (keyword: string) =>
        `/music/${encodeURI(encodeURIComponent(keyword))}`,
    }),
  }),
});

export const { useGetMusicByKeywordQuery } = musicApi;
