import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="bg-black w-full h-full">
      <div className="w-full h-full flex items-center justify-center bg-auth">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
