import { useFormik } from 'formik';
import { Link, useParams } from 'react-router-dom';
import SkeletonList from '../../components/common/SkeletonList';
import MusicList from '../../components/profile/MusicList';
import NotFound from '../../components/profile/NotFound';
import {
  addMusic,
  useGetMusicByPlaylistQuery,
} from '../../features/music/musicSlice';
import { useAppDispatch } from '../../store/hook';

const Playlist = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      title: '',
      image: '',
      songId: '',
      singer: '',
      playlist: '',
    },
    onSubmit: (values) => {
      dispatch(
        addMusic({
          ...values,
        }),
      );
    },
  });
  const { userId, playlist } = useParams();
  const { isLoading, data: songs } = useGetMusicByPlaylistQuery({
    userId,
    playlist,
  });
  return (
    <div className="bg-black w-full h-full flex flex-col p-8">
      {isLoading && <SkeletonList numberToRender={3} />}
      {songs && songs.length === 0 && (
        <div className="flex flex-col items-center">
          <NotFound className="w-full" />
          <Link
            className="bg-green-400 text-white font-bold p-4 rounded-xl text-center"
            to="/music/add"
          >
            음악 추가
          </Link>
        </div>
      )}
      {songs && <MusicList songs={songs} />}
    </div>
  );
};

export default Playlist;
