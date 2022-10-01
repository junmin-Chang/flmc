import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { LoginDto, RegisterDto, UserInfo } from '../../typings/auth';
import { axiosPrivateInstance, axiosPublicInstance } from '../../utils/axios';
const register = async ({ username, userId, password }: RegisterDto) => {
  return await axiosPrivateInstance.post('/auth/register', {
    username,
    userId,
    password,
  });
};

const login = async ({ userId, password }: LoginDto) => {
  const response = await axiosPrivateInstance.post('/auth/login', {
    userId,
    password,
  });
  return response;
};

const logout = () => {
  localStorage.removeItem('persist:root');
};

const refresh = async (refreshToken: string) => {
  return await axiosPublicInstance.post('/auth/refresh', {
    token: refreshToken,
  });
};

const addPlaylist = async ({ name, desc }: { name: string; desc: string }) => {
  const response = await axiosPrivateInstance.post('/user/playlist', {
    name,
    desc,
  });
  return response.data;
};

const deletePlaylist = async (playlistId: string) => {
  const response = await axiosPrivateInstance.delete(
    `/user/playlist/${playlistId}`,
  );
  return response.data;
};

const updatePlaylist = async ({ playlistId, name, desc }) => {
  const response = await axiosPrivateInstance.patch(
    `/user/playlist/${playlistId}`,
    {
      name,
      desc,
    },
  );
  if (response) {
    return {
      name,
      desc,
      playlistId,
    };
  }
};
export const userApi = createApi({
  reducerPath: 'userApi/search',
  tagTypes: ['User'],
  baseQuery: axiosPrivateInstance,
  endpoints: (builder) => ({
    getUserInfoById: builder.query<UserInfo, string>({
      query: (userId: string) => `/user/${userId}`,
      providesTags: ['User'],
    }),
  }),
});

export const { useGetUserInfoByIdQuery } = userApi;

const userService = {
  register,
  login,
  logout,
  refresh,
  addPlaylist,
  deletePlaylist,
  updatePlaylist,
};

export default userService;
