import React from 'react';

const CountryCardStarIcon = (props) => {
  const { isoCode, active, onMakeFavourite } = props;
  return (
    <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
      <span
        id={isoCode}
        className={active ? `text-yellow-100` : `text-green-100`}
        onClick={onMakeFavourite}
      >
        ★
      </span>
    </div>
  );
};

export default CountryCardStarIcon;
