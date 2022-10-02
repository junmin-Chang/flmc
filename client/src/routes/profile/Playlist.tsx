import { Link, useNavigate, useParams } from 'react-router-dom';
import SkeletonList from '../../components/common/SkeletonList';
import MusicList from '../../components/profile/MusicList';
import NotFound from '../../components/profile/NotFound';
import Quote from '../../components/profile/Quote';
import { deletePlaylist } from '../../features/user/userSlice';
import { useGetMusicByPlaylistQuery } from '../../services/music/musicService';
import {
  useGetUserInfoByIdQuery,
  userApi,
} from '../../services/user/userService';
import { useAppDispatch, useAppSelector } from '../../store/hook';

const Playlist = () => {
  const dispatch = useAppDispatch();
  const { userId, playlistId } = useParams();
  const navigate = useNavigate();
  const { isLoading: isLoadingSong, data: songs } = useGetMusicByPlaylistQuery(
    {
      userId,
      playlistId,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const { userInfo: loggedInUser } = useAppSelector((state) => state.user);
  const { data: currentUserInfo, isLoading: isLoadingUser } =
    useGetUserInfoByIdQuery(userId);

  return (
    <div className="bg-black w-full h-full flex flex-col p-8">
      <div className="flex w-full">
        {!isLoadingUser && loggedInUser?.userId === currentUserInfo.userId && (
          <div className="flex w-full flex-row justify-between pb-4">
            <button
              className="text-red-300 bold ml-auto"
              onClick={async () => {
                await dispatch(
                  deletePlaylist({
                    playlistToUpdate: loggedInUser.playlist.find(
                      (p) => p.id === playlistId,
                    ),
                  }),
                );
                dispatch(userApi.util.invalidateTags(['User']));
                navigate(`/profile/${userId}`);
              }}
            >
              삭제
            </button>
          </div>
        )}
      </div>
      {isLoadingSong && <SkeletonList numberToRender={3} />}

      {!isLoadingSong &&
        loggedInUser &&
        loggedInUser.userId === userId &&
        loggedInUser.playlist.map((p, i) => {
          if (p.id === playlistId) return <Quote key={i} content={p.desc} />;
        })}
      {!isLoadingSong &&
        (!loggedInUser || loggedInUser.userId !== userId) &&
        currentUserInfo?.playlist.map((p, i) => {
          if (p.id === playlistId) return <Quote key={i} content={p.desc} />;
        })}
      <div className="flex flex-col items-center">
        {songs && songs.length === 0 && <NotFound className="w-full" />}
      </div>
      {songs && <MusicList songs={songs} />}
      {currentUserInfo?.userId === userId && songs && songs.length !== 10 && (
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
