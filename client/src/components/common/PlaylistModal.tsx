import { useFormik } from 'formik';
import { ChangeEvent, useCallback } from 'react';
import { hideModal } from '../../features/modal/modalSlice';
import { addPlaylist, updatePlaylist } from '../../features/user/userSlice';
import { userApi } from '../../services/user/userService';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { PlaylistSchema } from '../../validation/playlist';

const Modal = () => {
  const { stateToUpdate } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const onClose = useCallback(
    (e: ChangeEvent<any>) => {
      if (e.target.id === 'modal-container') {
        dispatch(hideModal());
      }
    },
    [dispatch],
  );
  const formik = useFormik({
    initialValues: {
      name: (stateToUpdate ? stateToUpdate.name : '') as string,
      desc: (stateToUpdate ? stateToUpdate.desc : '') as string,
    },
    validationSchema: PlaylistSchema,
    onSubmit: async (values) => {
      dispatch(hideModal());
      if (stateToUpdate) {
        await dispatch(
          updatePlaylist({
            playlistToUpdate: stateToUpdate,
            ...values,
          }),
        );
      } else {
        await dispatch(
          addPlaylist({
            ...values,
          }),
        );
      }
      dispatch(userApi.util.invalidateTags(['User']));
    },
  });
  return (
    <div
      id="modal-container"
      onClick={onClose}
      className="w-full h-full backdrop-blur-md flex items-center justify-center fixed top-0 left-0"
    >
      <div className="relative w-4/5 bg-neutral-900 rounded-md flex flex-col p-4 z-50">
        <h2 className="text-2xl text-white font-black">플레이리스트 추가</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          <label htmlFor="playlist" className="text-white bold pt-4">
            이름
            {formik.errors.name && (
              <label className="text-red-300 pl-4">{formik.errors.name}</label>
            )}
          </label>

          <input
            id="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="ex) 드라이브 전용"
            className="bg-black px-4 h-[30px] text-white rounded-md mt-2"
          />
          <label htmlFor="desc" className="text-white bold pt-4">
            설명
            {formik.errors.desc && (
              <label className="text-red-300 pl-4">{formik.errors.desc}</label>
            )}
          </label>
          <textarea
            id="desc"
            value={formik.values.desc}
            onChange={formik.handleChange}
            className="bg-black px-4 h-[200px] text-white rounded-md mt-2"
          />
          <button
            type="submit"
            className="p-2 mt-8 rounded-md bg-green-400 text-white font-black"
          >
            {stateToUpdate ? '수정' : '생성'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
