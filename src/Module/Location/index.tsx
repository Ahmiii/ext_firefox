import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Layouts/Dashboard';
import CountryCardChip from '../../Molecule/LocationCard';
import { Content } from '../../Modules';
import './style.css';
let content = new Content();

const Location = () => {
  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const [favourites, setFavourites] = useState({});

  const onMakeFavourite = (e) => {
    let allFavourites = {
      ...favourites,
      [e.target.id]: favourites[e.target.id] ? false : true,
    };
    content
      .getLocationModule()
      .setFavourites(allFavourites)
      .then((res) => {
        setFavourites(allFavourites);
      });
  };

  const onSelectCountry = (e) => {
    content
      .getStorageModule()
      .getLocalStorageData('userData')
      .then((res: any) => {
        const url = `https://api.circuitvpn.com/proxy/server?country_code=${e}`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${res?.userData?.body?.access_token}`,
        };

        fetch(url, {
          method: 'GET',
          headers: headers,
        })
          .then((res) => {
            return res.json();
          })
          .then((response) => {
            content
              .getStorageModule()
              .setLocalStorageData('proxyServer', response?.body?.proxy_host)
              .then((res) => {
                content
                  .getStorageModule()
                  .setLocalStorageData('proxied', true)
                  .then((res) => {
                  });
              });
          });
      });
  };

  useEffect(() => {
    content
      .getStorageModule()
      .getLocalStorageData('countryList')
      .then((res: any) => {
        setCountryList(res?.countryList);
      })
      .catch((error) => {
        console.log({ error });
      });
    content
      .getLocationModule()
      .getFavourites()
      .then((res: any) => {
        console.log({ res });
        if (res?.favourites) {
          setFavourites(res?.favourites);
        } else {
          setFavourites(res);
        }
      })
      .catch((error) => {
        console.log({ error });
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
                  Object.entries(favourites).length > 0 &&
                  favourites[value?.code] && (
                    <CountryCardChip
                      key={key}
                      isoCode={value?.code}
                      countryName={value?.name}
                      onMakeFavourite={onMakeFavourite}
                      active={favourites[value?.code]}
                    />
                  )
              )}
            <p>Location</p>
            {countryList &&
              countryList.length > 0 &&
              countryList?.map((value, key) => (
                <CountryCardChip
                  key={key}
                  isoCode={value?.code}
                  countryName={value?.name}
                  onMakeFavourite={onMakeFavourite}
                  onSelectCountry={onSelectCountry}
                  active={favourites[value?.code]}
                />
              ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Location;
