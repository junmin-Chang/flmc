import { LoginDto, RegisterDto } from '../../typings/auth';
import { axiosInstance } from '../../utils/axios';

const register = ({ username, userId, password }: RegisterDto) => {
  return axiosInstance.post('/auth/register', {
    username,
    userId,
    password,
  });
};

const login = ({ userId, password }: LoginDto) => {
  return axiosInstance.post('/auth/login', {
    userId,
    password,
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const refresh = async (refreshToken: string) => {
  const response = await axiosInstance.post('/auth/refresh', {
    token: refreshToken,
  });

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  refresh,
};

export default authService;
