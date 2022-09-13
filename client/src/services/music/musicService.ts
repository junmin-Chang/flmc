import { AddMusicDto } from '../../typings/music';
import { axiosInstance } from '../../utils/axios';

const addMusic = async ({
  title,
  image,
  songId,
  singer,
  playlist,
}: AddMusicDto) => {
  const response = await axiosInstance.post('/music/add', {
    title,
    image,
    songId,
    singer,
    playlist,
  });

  return response.data;
};

const musicService = {
  addMusic,
};

export default musicService;
