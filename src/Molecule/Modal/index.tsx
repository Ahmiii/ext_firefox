import React from 'react';
import { useNavigate } from 'react-router-dom';
const Modal = (props) => {
  const { onCloseModal, show } = props;
  const navigate = useNavigate();
  const onLogoutHandler = () => {
    chrome.storage.local.clear().then((res) => {
      navigate('/login');
    });
  };
  return (
    <div
      className={`${
        !show ? 'hidden' : 'backdrop-sepia-0 bg-black/30'
      } h-full flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center`}
    >
      <div className='relative p-4 w-full max-w-2xl'>
        <div className='relative bg-white rounded-lg shadow bg-white-30 dark:bg-countr_card'>
          <div className='p-6'>
            <p className='text-base leading-relaxed dark:text-white-100'>
              Logout
            </p>
            <p className='text-sm leading-relaxed dark:text-white-100'>
              Areyou sure you want to logout
            </p>
          </div>
          <div className='flex justify-around items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600'>
            <button
              onClick={onLogoutHandler}
              type='button'
              className='text-base text-red w-full'
            >
              Yes
            </button>
            <button
              onClick={() => onCloseModal(false)}
              type='button'
              className='text-base text-red w-full'
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
