import { Parallax, ParallaxLayer } from '@react-spring/parallax';
const Home = () => {
  return (
    <Parallax pages={2}>
      <ParallaxLayer offset={0} speed={2.5} className="flex flex-col">
        <div className="w-full h-full flex flex-col p-8 bg-profile">
          <p className="text-green-400 text-3xl font-black">뮤로필</p>
          <div className="w-[300px] h-[300px] bg-green-200 rounded-xl backdrop-blur-xl"></div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={1}
        speed={1}
        className="flex items-center justify-center"
      >
        <div className="w-full h-full flex flex-col p-8">
          <p className="text-white">HIHI</p>
        </div>
      </ParallaxLayer>
    </Parallax>
  );
};

export default Home;
