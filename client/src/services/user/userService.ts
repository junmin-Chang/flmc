import { LoginDto, RegisterDto } from '../../typings/auth';
import { axiosInstance } from '../../utils/axios';

const register = async ({ username, userId, password }: RegisterDto) => {
  return await axiosInstance.post('/auth/register', {
    username,
    userId,
    password,
  });
};

const login = async ({ userId, password }: LoginDto) => {
  const response = await axiosInstance.post('/auth/login', {
    userId,
    password,
  });
  return response;
};

const logout = () => {
  localStorage.removeItem('auth');
};

const refresh = async (refreshToken: string) => {
  return await axiosInstance.post('/auth/refresh', {
    token: refreshToken,
  });
};

const addPlaylist = async (playlist: string) => {
  const response = await axiosInstance.post('/user/playlist', {
    playlist,
  });
  return response.data;
};

const userService = {
  register,
  login,
  logout,
  refresh,
  addPlaylist,
};

export default userService;
