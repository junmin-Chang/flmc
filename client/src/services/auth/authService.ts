import { RegisterDto } from '../../typings/auth';
import { axiosInstance } from '../../utils/axios';

const register = ({ username, userId, password }: RegisterDto) => {
  return axiosInstance.post('/auth/register', {
    username,
    userId,
    password,
  });
};

const authService = {
  register,
};

export default authService;
