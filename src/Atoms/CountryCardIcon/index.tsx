import React from 'react';

const CountryIcon = (props) => {
  const { isoCode } = props;
  return (
    <div className='flex-shrink-0'>
      <img
        className='w-8 h-8 rounded-full'
        // src='https://flowbite.com/docs/images/people/profile-picture-1.jpg'
        alt={`country_${isoCode}`}
      />
    </div>
  );
};
export default CountryIcon;
