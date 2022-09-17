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

const addPlaylist = async ({
  playlist,
  desc,
}: {
  playlist: string;
  desc: string;
}) => {
  const response = await axiosPrivateInstance.post('/user/playlist', {
    playlist,
    desc,
  });
  return response.data;
};

export const userApi = createApi({
  reducerPath: 'userApi/search',
  baseQuery: axiosPrivateInstance,
  endpoints: (builder) => ({
    getUserInfoById: builder.query<UserInfo, string>({
      query: (userId: string) => `/user/${userId}`,
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
};

export default userService;
