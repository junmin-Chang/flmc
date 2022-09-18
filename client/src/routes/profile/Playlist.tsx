import { Link, useParams } from 'react-router-dom';
import SkeletonList from '../../components/common/SkeletonList';
import MusicList from '../../components/profile/MusicList';
import NotFound from '../../components/profile/NotFound';
import Quote from '../../components/profile/Quote';
import { useGetMusicByPlaylistQuery } from '../../services/music/musicService';
import { useGetUserInfoByIdQuery } from '../../services/user/userService';
import { useAppSelector } from '../../store/hook';

const Playlist = () => {
  const { userId, playlist } = useParams();
  const { isLoading, data: songs } = useGetMusicByPlaylistQuery(
    {
      userId,
      playlist,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const { data: currentUserInfo } = useGetUserInfoByIdQuery(userId);
  return (
    <div className="bg-black w-full h-full flex flex-col p-8">
      {isLoading && <SkeletonList numberToRender={3} />}

      {!isLoading &&
        currentUserInfo.playlist.map((p, i) => {
          if (p.name === playlist) return <Quote key={i} content={p.desc} />;
        })}
      <div className="flex flex-col items-center">
        {songs && songs.length === 0 && <NotFound className="w-full" />}
      </div>
      {songs && <MusicList songs={songs} />}
      {currentUserInfo?.userId === userId && (
        <Link className="m-auto mt-0" to="/music/add">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default Playlist;
