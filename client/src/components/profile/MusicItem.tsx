import { useCallback } from 'react';
import { selectToDelete } from '../../features/music/musicSlice';
import { useAppDispatch } from '../../store/hook';
import { ProfileMusicResponseDto } from '../../typings/music';

const MusicItem = ({
  title,
  image,
  singer,
  id,
  edit,
}: Partial<ProfileMusicResponseDto> & { edit: boolean }) => {
  const dispatch = useAppDispatch();
  const onCheckSong = useCallback((e) => {
    dispatch(selectToDelete(id));
  }, []);
  return (
    <div className="w-full flex flex-row gap-4 items-center">
      <div className="w-fit h-fit">
        <img src={image} className="max-w-none w-[50px] h-[50px]" />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-white font-black">{title}</p>
        <p className="text-white text-sm">{singer}</p>
      </div>
      {edit && (
        <div className="ml-auto">
          <input
            onChange={onCheckSong}
            id="green-checkbox"
            type="checkbox"
            className="w-8 h-8 text-green-600 bg-green-100 rounded border-gray-300 focus:ring-green-500 focus:ring-2"
          />
          <label
            htmlFor="green-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default MusicItem;
