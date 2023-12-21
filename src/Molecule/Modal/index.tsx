import React from 'react';

const Modal = (props) => {
  const { show } = props;
  return (
    <div
      className={`${
        !show && 'hidden'
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-cente`}
    >
      <div className='relative p-4 w-full max-w-2xl'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='p-4 space-y-4'>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              Logout
            </p>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              Areyou sure you want to logout
            </p>
          </div>
          <div className='flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600'>
            <button
              data-modal-hide='default-modal'
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              I accept
            </button>
            <button
              data-modal-hide='default-modal'
              type='button'
              className='ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
