import { ProfileMusicResponseDto } from '../../typings/music';

const MusicItem = ({ title, image, singer }: ProfileMusicResponseDto) => {
  return (
    <div className="w-full flex flex-row gap-4">
      <div className="w-fit h-fit">
        <img src={image} className="w-16 h-16" />
      </div>
      <div className="w-full flex flex-col">
        <p className="text-white font-black">{title}</p>
        <p className="text-white text-sm">{singer}</p>
      </div>
    </div>
  );
};

export default MusicItem;
