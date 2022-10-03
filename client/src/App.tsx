import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import AuthLayout from './routes/auth/AuthLayout';
import Profile from './routes/profile/Profile';
import Nav from './components/common/Nav';
import { useAppSelector } from './store/hook';
import Modal from './components/common/PlaylistModal';
import Playlist from './routes/profile/Playlist';
import MusicSearch from './routes/music/MusicSearch';
import AddMusic from './components/common/MusicModal';
import ClipboardModal from './components/common/ClipboardModal';

function App() {
  const { isOpen, mode } = useAppSelector((state) => state.modal);
  return (
    <div className="w-full h-full">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/profile/:userId" element={<Profile />}>
          <Route path=":playlistId" element={<Playlist />} />
        </Route>
        <Route path="/music/add" element={<MusicSearch />} />
      </Routes>
      {isOpen && mode === 'playlist' && <Modal />}
      {isOpen && mode === 'music' && <AddMusic />}
      {isOpen && mode === 'clipboard' && <ClipboardModal />}
    </div>
  );
}

export default App;
