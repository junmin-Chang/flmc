import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosPrivateInstance } from '../../utils/axios';
import {
  AddMusicDto,
  MusicSearchResponseDto,
  ProfileMusicResponseDto,
} from '../../typings/music';

const addMusic = async ({
  title,
  image,
  songId,
  singer,
  playlistId,
}: AddMusicDto) => {
  const response = await axiosPrivateInstance.post('/music/add', {
    title,
    image,
    songId,
    singer,
    playlistId,
  });

  return response.data;
};

const deleteMusic = async (ids: string[]) => {
  const response = await axiosPrivateInstance.delete('/music/delete', {
    data: {
      ids: ids,
    },
  });
  return response.data;
};
export const musicApi = createApi({
  reducerPath: 'musicApi/search',
  tagTypes: ['Music'],
  baseQuery: axiosPrivateInstance,
  endpoints: (builder) => ({
    getMusicByKeyword: builder.query<MusicSearchResponseDto[], string>({
      query: (keyword: string) =>
        `/music/${encodeURI(encodeURIComponent(keyword))}`,
    }),
    getMusicByPlaylist: builder.query<
      ProfileMusicResponseDto[] | null,
      { userId: string | undefined; playlistId: string | undefined }
    >({
      query: ({ userId, playlistId }: { userId: string; playlistId: string }) =>
        `/music/${userId}/${playlistId}`,
      providesTags: ['Music'],
    }),
  }),
});

const musicService = {
  addMusic,
  deleteMusic,
};
export const { useGetMusicByKeywordQuery, useGetMusicByPlaylistQuery } =
  musicApi;
export default musicService;
