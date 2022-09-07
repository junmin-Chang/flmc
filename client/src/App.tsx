import { ChangeEvent, useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useGetMusicByKeywordQuery } from './features/musicSlice';
import useDebounce from './hooks/useDebounce';
import Home from './routes/Home';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import AuthLayout from './routes/auth/AuthLayout';

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
