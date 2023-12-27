import React from 'react';
import { useLocation } from 'react-router-dom';
const Tab = ({ onClick, tabPath, tabText, svgPath }) => {
  const location = useLocation();
  return (
    <button
      onClick={onClick}
      className='flex flex-col items-center justify-center relative'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
        className={`w-5 h-5 ${
          location?.pathname.includes(tabPath) ? 'fill-red' : 'fill-gray-500'
        }`}
      >
        {svgPath}
      </svg>

      <p
        className={
          location.pathname.includes(tabPath) ? 'text-red' : 'text-gray-500'
        }
      >
        {tabText}
      </p>
      {location.pathname.includes(tabPath) && (
        <div className='relative w-24'>
          <div className='absolute inset-x-0 bottom-[-16px] h-1 rounded-t-lg bg-red'></div>
        </div>
      )}
    </button>
  );
};
export default Tab;
