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
      { userId: string | undefined; playlistId: string | undefined }
    >({
      query: ({ userId, playlistId }: { userId: string; playlistId: string }) =>
        `/music/${userId}/${playlistId}`,
    }),
  }),
});

const musicService = {
  addMusic,
};
export const { useGetMusicByKeywordQuery, useGetMusicByPlaylistQuery } =
  musicApi;
export default musicService;
