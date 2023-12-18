import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../Layouts/Dashboard';
import CountryCardChip from '../../Molecule/LocationCard';
import { Content } from '../../Modules';
import './style.css';
let content = new Content();

const Location = () => {
  const [countryList, setCountryList] = useState([]);
  const [favourites, setFavourites] = useState({});
  const onMakeFavourite = (e) => {
    let allFavourites = {
      ...favourites,
      [e.target.id]: true,
    };
    content
      .getLocationModule()
      .setFavourites('favourites', allFavourites)
      .then((res) => {
        setFavourites(allFavourites);
      });
  };

  useEffect(() => {
    content
      .getStorageModule()
      .getLocalStorageData('countryList')
      .then((res: any) => {
        setCountryList(res?.countryList);
      });
    content
      .getLocationModule()
      .getFavourites()
      .then((res: any) => {
        setFavourites(res?.favourites);
      });
  }, []);

  return (
    <DashboardLayout>
      <div className='grid gird-rows-1'>
        <div className='grid-cols-1'>
          <div className='overflow-y-auto locationCard'>
            <p>favourites</p>
            {countryList &&
              countryList.length > 0 &&
              countryList?.map(
                (value, key) =>
                  favourites[value.icon] && (
                    <CountryCardChip
                      key={key}
                      isoCode={value.code}
                      countryName={value.name}
                      active={favourites[value.icon] ? true : false}
                    />
                  )
              )}
            <p>Location</p>
            {countryList &&
              countryList.length > 0 &&
              countryList?.map((value, key) => (
                <CountryCardChip
                  key={key}
                  isoCode={value.code}
                  countryName={value.name}
                  onMakeFavourite={onMakeFavourite}
                  active={favourites[value.icon] ? true : false}
                />
              ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Location;
