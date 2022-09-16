import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Skeleton from '../../components/common/SkeletonPlaylist';
import PlaylistButton from '../../components/profile/PlaylistButton';
import { useGetUserInfoByIdQuery } from '../../services/user/userService';
const Profile = () => {
  const { userId } = useParams();
  const { isLoading, data: userInfo } = useGetUserInfoByIdQuery(
    userId as string,
    {
      skip: userId === undefined,
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <div className="w-full h-full flex flex-col bg-profile">
      <h2 className="text-white text-4xl font-black p-8">{userId} 님.</h2>
      {isLoading && <Skeleton />}
      {!isLoading && (
        <PlaylistButton
          userId={userInfo?.userId}
          playlist={userInfo?.playlist}
        />
      )}

      <Outlet />
    </div>
  );
};

export default Profile;
