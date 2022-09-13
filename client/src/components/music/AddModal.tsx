import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { addMusic } from '../../features/music/musicSlice';
import Select from 'react-select';
const AddMusic = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const { title, image, songId, singer } = useAppSelector(
    (state) => state.music.selectedSong,
  );
  const [playlist, setPlaylist] = useState('');
  const dispatch = useAppDispatch();
  return (
    <div
      id="modal-container"
      className="w-full h-full backdrop-blur-md flex items-center justify-center absolute top-0 left-0"
    >
      <div className="relative w-4/5 bg-neutral-900 rounded-md flex flex-col p-4 z-50">
        <h2 className="text-2xl text-white font-black">음악 추가</h2>
        <Select
          options={userInfo?.playlist.map((p: string) => ({
            name: p,
            label: p,
          }))}
          onChange={(newValue) => setPlaylist(newValue!.label)}
        />
        <button
          onClick={() => {
            console.log(title, image);
            dispatch(
              addMusic({
                title,
                singer,
                image,
                songId,
                playlist,
              }),
            );
          }}
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default AddMusic;
