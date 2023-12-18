import React from 'react';
import CountryIcon from '../../Atoms/CountryCardIcon';
import CountryCardContent from '../../Atoms/CountryCardContent';
import CountryCardStarIcon from '../../Atoms/CountryCardStarIcon';
const CountryCardChip = (props) => {
  const { isoCode, countryName, countryDescription } = props;
  return (
    <div className='rounded-lg place-self-center p-4 mb-4 dark:bg-countr_card'>
      <div className='flex items-center space-x-4'>
        <CountryIcon isoCode={isoCode} />
        <CountryCardContent
          countryName={countryName}
          countryDescription={countryDescription}
        />
        <CountryCardStarIcon />
      </div>
    </div>
  );
};
export default CountryCardChip;
