import { ProfileMusicResponseDto } from '../../typings/music';

const MusicItem = ({
  title,
  image,
  singer,
  id,
  edit,
  onChangeCheck,
}: Partial<ProfileMusicResponseDto> & {
  edit: boolean;
  onChangeCheck: (id: string) => void;
}) => {
  return (
    <div>
      {edit && (
        <input
          onChange={() => onChangeCheck(id)}
          id={id}
          type="checkbox"
          className="hidden peer"
        />
      )}
      <label
        htmlFor={id}
        className="w-full flex flex-row gap-4 items-center peer-checked:border peer-checked:border-green-600"
      >
        <div className="w-fit h-fit">
          <img src={image} className="max-w-none w-[50px] h-[50px]" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-white font-black">{title}</p>
          <p className="text-white text-sm">{singer}</p>
        </div>
      </label>
    </div>
  );
};

export default MusicItem;
