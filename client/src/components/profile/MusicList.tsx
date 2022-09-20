import { useState } from 'react';
import { deleteMusic } from '../../features/music/musicSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { ProfileMusicResponseDto } from '../../typings/music';
import MusicItem from './MusicItem';

const MusicList = ({ songs }: { songs: ProfileMusicResponseDto[] }) => {
  const [edit, setEdit] = useState(false);
  const { songsToDelete } = useAppSelector((state) => state.music);
  const dispatch = useAppDispatch();
  return (
    <div className="w-full flex flex-col gap-4 p-8">
      <div className="flex flex-row pb-4 justify-between">
        <p
          className="text-green-300 text-sm max-w-[100px]"
          onClick={() => setEdit(!edit)}
        >
          편집
        </p>
        {songsToDelete.length !== 0 && (
          <span
            className="text-red-300 text-sm max-w-[100px]"
            onClick={async () => {
              dispatch(await deleteMusic(songsToDelete));
            }}
          >
            삭제
          </span>
        )}
      </div>

      {songs.map((s, i) => (
        <MusicItem
          title={s.title}
          singer={s.singer}
          image={s.image}
          id={s.id}
          edit={edit}
          key={s.id}
        />
      ))}
    </div>
  );
};

export default MusicList;
