import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { register } from '../../features/user/userSlice';
import { useAppDispatch } from '../../store/hook';
import { RegisterDto } from '../../typings/auth';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      userId: '',
      password: '',
    },
    onSubmit: (values: RegisterDto) => {
      dispatch(
        register({
          ...values,
        }),
      )
        .unwrap()
        .then(() => {
          navigate('/auth/login');
        });
    },
  });
  return (
    <div className="flex flex-col w-[350px] h-[400px] items-center backdrop-blur-sm p-4">
      <h2 className="text-3xl text-white bold font-black">회원가입</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-white font-bold">
              닉네임
            </label>
            <input
              id="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="ex) 음잘알123"
              className="w-full h-[40px] px-4 text-white bg-black rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="userId" className="text-white font-bold">
              아이디
            </label>
            <input
              id="userId"
              onChange={formik.handleChange}
              value={formik.values.userId}
              placeholder="아이디"
              className="w-full h-[40px] px-4 text-white bg-black rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-white font-bold">
              패스워드
            </label>
            <input
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              placeholder="패스워드"
              className="w-full h-[40px] px-4 text-white bg-black rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white font-black h-[50px] hover:opacity-50"
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
