import { ChangeEvent, useCallback } from 'react';
import { hide } from '../../features/modal/modalSlice';
import { useAppDispatch } from '../../store/hook';

const Modal = () => {
  const dispatch = useAppDispatch();
  const onClose = useCallback(
    (e: ChangeEvent<any>) => {
      if (e.target.id === 'modal-container') {
        dispatch(hide());
      }
    },
    [dispatch],
  );
  return (
    <div
      id="modal-container"
      onClick={onClose}
      className="w-full h-full backdrop-blur-md flex items-center justify-center absolute top-0 left-0"
    >
      <div className="relative w-4/5 bg-neutral-900 rounded-md flex flex-col p-4 z-50">
        <h2 className="text-2xl text-white font-black">플레이리스트 추가</h2>
        <label htmlFor="playlist" className="text-white bold pt-4">
          이름
        </label>
        <input
          id="playlist"
          type="text"
          placeholder="ex) 드라이브 전용"
          className="bg-black px-4 h-[30px] text-white rounded-md mt-2"
        />
        <button className="p-2 mt-8 rounded-md bg-green-400 text-white font-black">
          생성
        </button>
      </div>
    </div>
  );
};

export default Modal;
