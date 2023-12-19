import React from 'react';
import CountryIcon from '../../Atoms/CountryCardIcon';
import CountryCardContent from '../../Atoms/CountryCardContent';
import CountryCardStarIcon from '../../Atoms/CountryCardStarIcon';
const CountryCardChip = (props) => {
  const {
    isoCode,
    countryName,
    countryDescription,
    active,
    onMakeFavourite,
    onSelectCountry,
  } = props;
  return (
    <div
      onClick={() => onSelectCountry(isoCode)}
      className='rounded-lg place-self-center p-4 mb-4 dark:bg-countr_card'
    >
      <div className='flex items-center space-x-4'>
        <CountryIcon isoCode={isoCode} />
        <CountryCardContent
          countryName={countryName}
          countryDescription={countryDescription}
        />
        <CountryCardStarIcon
          isoCode={isoCode}
          active={active}
          onMakeFavourite={onMakeFavourite}
        />
      </div>
    </div>
  );
};
export default CountryCardChip;
