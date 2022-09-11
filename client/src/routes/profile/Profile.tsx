import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PlaylistButton from '../../components/profile/PlaylistButton';
import { useGetMusicByKeywordQuery } from '../../features/music/musicSlice';
import { getUserProfile } from '../../features/user/userSlice';
import useDebounce from '../../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../store/hook';

const Profile = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserProfile(userId as string));
  }, [dispatch, userId]);
  return (
    <div className="w-full h-full flex flex-col bg-profile">
      <h2 className="text-white text-4xl font-black p-8">{userId} 님.</h2>
      <PlaylistButton />
    </div>
  );
};

export default Profile;
