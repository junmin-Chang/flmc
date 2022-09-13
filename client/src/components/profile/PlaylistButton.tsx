import { showAddPlaylist } from '../../features/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { Link } from 'react-router-dom';
const PlaylistButton = ({
  playlist,
  userId,
}: {
  userId: string | undefined;
  playlist: string[] | undefined;
}) => {
  const { userInfo: loggedInUserId } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <div className="w-full px-4 py-2 flex flex-row gap-2">
      {playlist?.slice(0, 3).map((p: string, i: number) => (
        <Link
          to={`/profile/${userId}/${p}`}
          key={i}
          className="p-2 bg-green-400 text-white rounded-md font-black"
        >
          {p}
        </Link>
      ))}
      {userId === loggedInUserId?.userId && (
        <button
          className="p-2 bg-green-400 text-white rounded-md"
          onClick={() => {
            dispatch(showAddPlaylist());
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PlaylistButton;
