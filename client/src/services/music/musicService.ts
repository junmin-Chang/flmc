import { axiosInstance } from '../../utils/axios';

const addPlaylist = async (playlist: string) => {
  const response = await axiosInstance.post('/user/playlist', {
    playlist,
  });
  return response.data;
};

const musicService = {
  addPlaylist,
};

export default musicService;
