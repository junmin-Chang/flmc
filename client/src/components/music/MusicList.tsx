import { MusicSearchResponseDto } from '../../typings/music';
import MusicItem from './MusicItem';

const MusicList = ({ songs }: { songs: MusicSearchResponseDto[] }) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 p-8">
      {songs.map((s, i) => (
        <MusicItem
          name={s.name}
          artists={s.artists}
          album={s.album}
          key={s.id}
          id={s.id}
        />
      ))}
    </div>
  );
};

export default MusicList;
