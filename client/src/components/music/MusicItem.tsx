import { showAddMusic } from '../../features/modal/modalSlice';
import { selectMusic } from '../../features/music/musicSlice';
import { useAppDispatch } from '../../store/hook';
import { MusicResponseDto } from '../../typings/music';

const MusicItem = ({ name, album, artists, id }: MusicResponseDto) => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full flex flex-row gap-4">
      <div className="w-fit h-fit">
        <img src={album.images[0].url} className="w-16 h-16" />
      </div>
      <div className="w-full flex flex-col">
        <p className="text-white font-black">{name}</p>
        <p className="text-white text-sm">{artists[0].name}</p>
      </div>
      <svg
        onClick={() => {
          dispatch(showAddMusic());
          dispatch(
            selectMusic({
              name,
              album,
              artists,
              id,
            }),
          );
        }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12 text-green-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
};

export default MusicItem;
