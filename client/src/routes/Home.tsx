import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useSpring, animated } from 'react-spring';
const Home = () => {
  const logoStyle = useSpring({
    from: { transform: 'translateY(0%)' },
    to: {
      transform: 'translateY(-100%)',
    },
    config: { duration: 1500 },
  });
  const opacityStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1500 },
  });
  const colorStyle = useSpring({
    from: { color: 'white' },
    to: { color: '#22c55e' },
    config: {
      duration: 1500,
    },
  });
  return (
    <Parallax pages={2}>
      <ParallaxLayer offset={0} speed={0.5} className="flex flex-col">
        <div className="w-full h-full flex flex-col p-8 bg-profile items-center justify-center gap-2">
          <animated.p
            style={logoStyle}
            className="text-gray-200 text-3xl font-black"
          >
            Murofile
          </animated.p>
          <animated.p
            style={opacityStyle}
            className="text-gray-300 underline decoration-green-500 text-center"
          >
            나 자신을 표현할 수 있는 플레이리스트를 만들어보세요.
          </animated.p>
          <animated.p
            style={colorStyle}
            className="text-gray-300 text-center font-bold"
          >
            뮤로필을 통해 플레이리스트로 나를 소개할 수 있습니다.
          </animated.p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 absolute inset-x-1/2 bottom-20 text-white animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </ParallaxLayer>

      <ParallaxLayer
        offset={1}
        speed={0.5}
        className="flex items-center justify-center"
      >
        <div className="w-full bg-profile flex gap-4 items-center p-8 flex-wrap">
          <div className="p-4 w-full border border-green-400 rounded-md flex flex-col items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <p className="text-gray-200">
              Spotify Api를 통한 전 세계 음악을 검색해보세요
            </p>
          </div>
          <div className="p-4 w-full border border-green-400 rounded-md flex flex-col items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
              />
            </svg>

            <p className="text-gray-200">
              간편하게 자신을 표현할 수 있는 플리를 만들고 그 플레이리스트에
              대해 설명해보세요
            </p>
          </div>
          <div className="p-4 w-full border border-green-400 rounded-md flex flex-col items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-green-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
              />
            </svg>

            <p className="text-gray-200">딱 10곡만으로 플리를 표현해보세요</p>
          </div>{' '}
          <div className="p-4 w-full border border-green-400 rounded-md flex flex-col items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>

            <p className="text-gray-200">
              친구들과 내 프로필을 공유하여 나 자신을 음악으로 표현해보세요
            </p>
          </div>
        </div>
      </ParallaxLayer>
    </Parallax>
  );
};

export default Home;
