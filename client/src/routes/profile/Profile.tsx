import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMusicByKeywordQuery } from '../../features/music/musicSlice';
import useDebounce from '../../hooks/useDebounce';

const Profile = () => {
  const { userId } = useParams();

  return (
    <div className="w-full h-full flex flex-col bg-profile">
      <h2 className="text-white text-4xl font-black p-8">{userId} 님.</h2>
    </div>
  );
};

export default Profile;
