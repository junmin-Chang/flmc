import { show } from '../../features/modal/modalSlice';
import { useAppDispatch } from '../../store/hook';
import { User, UserInfo } from '../../typings/auth';

const PlaylistButton = ({
  playlist,
  isAdmin,
}: {
  playlist: string[] | undefined;
  isAdmin: boolean | undefined;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full px-4 py-2 flex flex-row gap-2">
      {playlist?.slice(0, 3).map((p: string, i: number) => (
        <button
          key={i}
          className="p-2 bg-green-400 text-white rounded-md font-black"
        >
          {p}
        </button>
      ))}
      {isAdmin && (
        <button
          className="p-2 bg-green-400 text-white rounded-md"
          onClick={() => {
            dispatch(show());
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
