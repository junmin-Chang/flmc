import { ChangeEvent, useCallback, useState } from 'react';
import { useGetMusicByKeywordQuery } from '../../features/music/musicSlice';
import useDebounce from '../../hooks/useDebounce';

const MusicSearch = () => {
  const [value, setValue] = useState('');
  const keyword = useDebounce(value, 500);
  const { data, isLoading } = useGetMusicByKeywordQuery(keyword, {
    skip: value.trim().length === 0,
  });
  const onChangeKeyword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [value, setValue],
  );
  return (
    <div className="w-full h-full flex flex-col bg-profile">
      <div className="flex w-full px-4 py-8 items-center">
        <input
          className="w-full h-[50px] px-4 bg-gray-800 rounded-lg text-white"
          onChange={onChangeKeyword}
          value={value}
        />
      </div>
      {isLoading && <p className="text-white">LOADING</p>}
      {data &&
        data.map((d, i) => {
          return (
            <p className="text-white" key={i}>
              {d.name}
            </p>
          );
        })}
    </div>
  );
};

export default MusicSearch;
