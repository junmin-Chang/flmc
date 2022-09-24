import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { deleteMusic } from '../../features/music/musicSlice';
import { musicApi } from '../../services/music/musicService';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { ProfileMusicResponseDto } from '../../typings/music';
import MusicItem from './MusicItem';

const MusicList = ({ songs }: { songs: ProfileMusicResponseDto[] }) => {
  const [edit, setEdit] = useState(false);
  const { userId } = useParams();
  const { userInfo } = useAppSelector((state) => state.user);
  const [songsToDelete, setSongsToDelete] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const onChangeCheck = useCallback(
    (id: string) => {
      if (songsToDelete.includes(id)) {
        const newIds = songsToDelete.filter((i) => i !== id);
        setSongsToDelete(newIds);
      } else {
        setSongsToDelete([...songsToDelete, id]);
      }
    },
    [songsToDelete, setSongsToDelete],
  );
  return (
    <div className="w-full flex flex-col gap-4 p-8">
      <div className="flex flex-row pb-4 justify-between">
        {songs.length !== 0 && userInfo?.userId === userId && (
          <p
            className="text-green-300 text-sm max-w-[100px]"
            onClick={() => {
              setEdit(!edit);
              setSongsToDelete([]);
            }}
          >
            {edit ? '취소' : '편집'}
          </p>
        )}
        {songsToDelete.length !== 0 && edit && (
          <span
            className="text-red-300 text-sm max-w-[100px]"
            onClick={async () => {
              setEdit(false);
              await dispatch(deleteMusic(songsToDelete));
              dispatch(musicApi.util.invalidateTags(['Music']));
              setSongsToDelete([]);
            }}
          >
            삭제
          </span>
        )}
      </div>

      {songs.map((s, _) => (
        <MusicItem
          title={s.title}
          singer={s.singer}
          image={s.image}
          id={s.id}
          edit={edit}
          key={s.id}
          onChangeCheck={onChangeCheck}
        />
      ))}
    </div>
  );
};

export default MusicList;
