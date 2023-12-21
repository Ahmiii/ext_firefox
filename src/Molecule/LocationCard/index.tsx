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
    <div className='flex justify-between rounded-lg place-self-center p-4 mb-2 dark:bg-countr_card'>
      <div
        onClick={() =>
          onSelectCountry({
            isoCode: isoCode,
            countryName: countryName,
            isChangeProxyServer: true,
          })
        }
        className='w-full flex items-center space-x-4'
      >
        <CountryIcon isoCode={isoCode} />
        <CountryCardContent
          countryName={countryName}
          countryDescription={countryDescription}
        />
      </div>
      <CountryCardStarIcon
        isoCode={isoCode}
        active={active}
        onMakeFavourite={onMakeFavourite}
      />
    </div>
  );
};
export default CountryCardChip;
