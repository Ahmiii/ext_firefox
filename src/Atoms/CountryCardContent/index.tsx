import React from 'react';

const CountryCardContent = (props) => {
  const { countryName, countryDescription } = props;
  return (
    <div className='flex-1 min-w-0'>
      <p className='text-base dark:text-white-100'>{countryName}</p>
    </div>
  );
};
export default CountryCardContent;
