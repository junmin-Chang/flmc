import { showAddMusic } from '../../features/modal/modalSlice';
import { selectMusic } from '../../features/music/musicSlice';
import { useAppDispatch } from '../../store/hook';
import { MusicSearchResponseDto } from '../../typings/music';

const MusicItem = ({ name, album, artists, id }: MusicSearchResponseDto) => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full flex flex-row gap-4 items-center">
      <div className="w-fit h-fit flex">
        <img
          src={album.images[0].url}
          className="max-w-none w-[50px] h-[50px]"
        />
      </div>
      <div className="flex flex-col w-full">
        <p className="text-sm text-white font-black overflow-hidden text-ellipsis">
          {name}
        </p>
        <p className="text-white text-sm">{artists[0].name}</p>
      </div>
      <svg
        onClick={() => {
          dispatch(showAddMusic());
          dispatch(
            selectMusic({
              title: name,
              image: album.images[0].url,
              singer: artists[0].name,
              songId: id,
            }),
          );
        }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 text-green-400"
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
