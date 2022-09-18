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
  playlistName,
  playlistId,
}: AddMusicDto) => {
  const response = await axiosPrivateInstance.post('/music/add', {
    title,
    image,
    songId,
    singer,
    playlistName,
    playlistId,
  });

  return response.data;
};
export const musicApi = createApi({
  reducerPath: 'musicApi/search',
  baseQuery: axiosPrivateInstance,
  endpoints: (builder) => ({
    getMusicByKeyword: builder.query<MusicSearchResponseDto[], string>({
      query: (keyword: string) =>
        `/music/${encodeURI(encodeURIComponent(keyword))}`,
    }),
    getMusicByPlaylist: builder.query<
      ProfileMusicResponseDto[] | null,
      { userId: string | undefined; playlist: string | undefined }
    >({
      query: ({ userId, playlist }: { userId: string; playlist: string }) =>
        `/music/${userId}/${encodeURI(encodeURIComponent(playlist))}`,
    }),
  }),
});

const musicService = {
  addMusic,
};
export const { useGetMusicByKeywordQuery, useGetMusicByPlaylistQuery } =
  musicApi;
export default musicService;
