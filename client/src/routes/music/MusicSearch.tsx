import { ChangeEvent, useCallback, useState } from 'react';
import SkeletonList from '../../components/common/SkeletonList';
import MusicList from '../../components/music/MusicList';
import useDebounce from '../../hooks/useDebounce';
import { useGetMusicByKeywordQuery } from '../../services/music/musicService';

const MusicSearch = () => {
  const [value, setValue] = useState('');
  const keyword = useDebounce(value, 500);
  const { data: songs, isLoading } = useGetMusicByKeywordQuery(keyword, {
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white absolute right-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      {isLoading && <SkeletonList numberToRender={4} />}
      {songs && <MusicList songs={songs} />}
    </div>
  );
};

export default MusicSearch;
