import React from 'react';

const CountryCardContent = (props) => {
  const { countryName, countryDescription } = props;
  return (
    <div className='flex-1 min-w-0'>
      <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
        {countryName}
      </p>
    </div>
  );
};
export default CountryCardContent;
