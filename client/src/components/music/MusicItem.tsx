import { useCallback } from 'react';
import { addMusic } from '../../features/music/musicSlice';
import { useAppDispatch } from '../../store/hook';
import { MusicResponseDto } from '../../typings/music';

const MusicItem = ({ name, album, artists, id }: MusicResponseDto) => {
  const dispatch = useAppDispatch();
  const addItem = useCallback(() => {
    dispatch(
      addMusic({
        title: name,
        image: album.images[0].url,
        singer: artists[0].name,
        songId: id,
        playlist: 'Drive',
      }),
    );
  }, []);
  return (
    <div className="w-full flex flex-row gap-4">
      <div className="w-fit h-fit">
        <img src={album.images[0].url} className="w-16 h-16" />
      </div>
      <div className="w-full flex flex-col">
        <p className="text-white">{name}</p>
        <p className="text-white">{artists[0].name}</p>
      </div>
    </div>
  );
};

export default MusicItem;
