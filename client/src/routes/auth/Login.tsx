const Login = () => {
  return (
    <div className="flex flex-col w-[350px] h-[400px] items-center backdrop-blur-sm p-4">
      <h2 className="text-3xl text-white bold font-black">로그인</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-white font-bold">아이디</label>
          <input
            placeholder="아이디"
            className="w-full h-[40px] px-4 text-black bg-black rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-bold">패스워드</label>
          <input
            placeholder="패스워드"
            className="w-full h-[40px] px-4 text-black bg-black rounded-md"
          />
        </div>
        <button className="bg-green-500 text-white font-black h-[50px] hover:opacity-50">
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
