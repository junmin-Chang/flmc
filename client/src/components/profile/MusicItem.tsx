import { ProfileMusicResponseDto } from '../../typings/music';

const MusicItem = ({ title, image, singer }: ProfileMusicResponseDto) => {
  return (
    <div className="w-full flex flex-row gap-4 items-center">
      <div className="w-fit h-fit">
        <img src={image} className="max-w-none w-[50px] h-[50px]" />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-white font-black">{title}</p>
        <p className="text-white text-sm">{singer}</p>
      </div>
    </div>
  );
};

export default MusicItem;
