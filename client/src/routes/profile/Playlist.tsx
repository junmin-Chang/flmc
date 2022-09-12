import { useParams } from 'react-router-dom';

const Playlist = () => {
  const { playlist } = useParams();
  return (
    <div className="bg-white w-full h-full">
      <p>{playlist}</p>
    </div>
  );
};

export default Playlist;
