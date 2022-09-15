import { MusicResponseDto, ProfileMusicResponseDto } from '../../typings/music';
import MusicItem from './MusicItem';

const MusicList = ({ songs }: { songs: ProfileMusicResponseDto[] }) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 p-8">
      {songs.map((s, i) => (
        <MusicItem
          title={s.title}
          singer={s.singer}
          image={s.image}
          key={s.id}
        />
      ))}
    </div>
  );
};

export default MusicList;
