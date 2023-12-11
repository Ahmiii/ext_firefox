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
        className={`w-5 h-5 ${location?.pathname == tabPath && 'fill-red'}`}
      >
        {svgPath}
      </svg>

      <p className={tabPath === location.pathname ? 'text-red' : ''}>
        {tabText}
      </p>
      {tabPath === location.pathname && (
        <div className='relative w-24'>
          <div className='absolute inset-x-0 bottom-[-16px] h-1 bg-red'></div>
        </div>
      )}
    </button>
  );
};
export default Tab;
