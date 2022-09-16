import { Link, useParams } from 'react-router-dom';
import SkeletonList from '../../components/common/SkeletonList';
import MusicList from '../../components/profile/MusicList';
import NotFound from '../../components/profile/NotFound';
import { useGetMusicByPlaylistQuery } from '../../services/music/musicService';
import { useAppSelector } from '../../store/hook';

const Playlist = () => {
  const { userId, playlist } = useParams();
  const { isLoading, data: songs } = useGetMusicByPlaylistQuery({
    userId,
    playlist,
  });
  const { userInfo: currentUserInfo } = useAppSelector((state) => state.user);
  return (
    <div className="bg-black w-full h-full flex flex-col p-8">
      {isLoading && <SkeletonList numberToRender={3} />}
      {songs && songs.length === 0 && (
        <div className="flex flex-col items-center">
          <NotFound className="w-full" />
          {currentUserInfo?.userId === userId && (
            <Link
              className="bg-green-400 text-white font-bold p-4 rounded-xl text-center"
              to="/music/add"
            >
              음악 추가
            </Link>
          )}
        </div>
      )}
      {songs && <MusicList songs={songs} />}
    </div>
  );
};

export default Playlist;
