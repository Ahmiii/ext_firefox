import React, { useState } from 'react';

const Alert = ({ message, type, showAlert, handleClose }) => {
  return (
    <>
      {showAlert && (
        <div
          className={`fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50`}
        >
          <div
            className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ${
              type === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <div className='flex justify-between items-center border-b-2 border-gray-100 p-4'>
              <p className='text-sm font-semibold'>
                {type === 'success' ? 'Success' : 'Error'}
              </p>
              <button
                onClick={handleClose}
                className='text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700'
              >
                <svg
                  className='h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586l4.293-4.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            <div className='p-4'>
              <p className='text-sm text-gray-700'>{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
