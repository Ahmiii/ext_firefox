import React from 'react';
const CountryIcon = (props) => {
  const { isoCode } = props;
  return (
    <div className='flex-shrink-0'>
      <img
        className='w-8 h-8 rounded-full'
        src={require(`../../assets/flags/ic_rounded_${isoCode}.png`).default}
        alt={`country_${isoCode}`}
      />
    </div>
  );
};
export default CountryIcon;
