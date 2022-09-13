import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
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
  const { isLoading, data } = useGetMusicByPlaylistQuery({ userId, playlist });
  return (
    <div className="bg-black w-full h-full flex flex-col p-8">
      {isLoading && <p className="text-white">LOADING...</p>}
      {data && data.length === 0 && (
        <form onSubmit={formik.handleSubmit}>
          <p className="text-white">EMPTY</p>
          <input
            className="text-black"
            id="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />

          <input
            className="text-black"
            id="image"
            onChange={formik.handleChange}
            value={formik.values.image}
          />
          <input
            className="text-black"
            id="songId"
            onChange={formik.handleChange}
            value={formik.values.songId}
          />
          <input
            className="text-black"
            id="singer"
            onChange={formik.handleChange}
            value={formik.values.singer}
          />
          <input
            className="text-black"
            id="playlist"
            onChange={formik.handleChange}
            value={formik.values.playlist}
          />
          <button className="bg-white" type="submit">
            ADD
          </button>
        </form>
      )}
    </div>
  );
};

export default Playlist;
