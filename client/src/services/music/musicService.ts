import { axiosInstance } from '../../utils/axios';

const addMusic = async ({
  title,
  image,
  songId,
  singer,
  playlist,
}: {
  title: string;
  image: string;
  songId: string;
  singer: string;
  playlist: string;
}) => {
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
