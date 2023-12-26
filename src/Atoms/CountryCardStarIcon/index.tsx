import React from 'react';

const CountryCardStarIcon = (props) => {
  const { isoCode, active, onMakeFavourite } = props;
  return (
    <div onClick={onMakeFavourite} id={isoCode}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke={`${!active && '#ffff'}`}
        className='w-6 h-6'
      >
        <path
          className={`${active && 'fill-yellow-100'}`}
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
        />
      </svg>
    </div>

    // <div className='p-2 rounded-lg inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
    //   <span
    //     id={isoCode}
    //     className={active ? `text-yellow-100` : `text-green-100`}
    //     onClick={onMakeFavourite}
    //   >
    //     ★
    //   </span>
    // </div>
  );
};

export default CountryCardStarIcon;
