import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../store/hook';
import { LoginDto } from '../../typings/auth';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userId: '',
      password: '',
    },
    onSubmit: (values: LoginDto) => {
      dispatch(login({ ...values }))
        .unwrap()
        .then(() => {
          navigate('/');
        });
    },
  });
  return (
    <div className="flex flex-col w-[350px] h-[400px] items-center backdrop-blur-sm p-4">
      <h2 className="text-3xl text-white bold font-black">로그인</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="userId" className="text-white font-bold">
              아이디
            </label>
            <input
              id="userId"
              value={formik.values.userId}
              onChange={formik.handleChange}
              placeholder="아이디"
              className="w-full h-[40px] px-4 bg-black rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-white font-bold">
              패스워드
            </label>
            <input
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="패스워드"
              className="w-full h-[40px] px-4 bg-black rounded-md"
            />
          </div>
          <button className="bg-green-500 text-white font-black h-[50px] hover:opacity-50">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
