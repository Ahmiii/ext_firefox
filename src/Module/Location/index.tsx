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

  const onChangeCountry = (e) => {
    content
      .getStorageModule()
      .setLocalStorageData('countryCode', e)
      .then((res) => {
        content
          .getStorageModule()
          .setLocalStorageData('isChangeProxyServer', true)
          .then((res) => {
            content
              .getStorageModule()
              .setLocalStorageData('proxied', false)
              .then((res) => {
                navigate('/dashboard');
              });
          });
      });
    // content
    //   .getStorageModule()
    //   .setLocalStorageData('isChangeProxyServer', true)
    //   .then((res) => {
    //     content
    //       .getStorageModule()
    //       .setLocalStorageData('proxied', false)
    //       .then((res) => {
    //         navigate('/dashboard');
    //       });
    //   });
    // content
    //   .getStorageModule()
    //   .getLocalStorageData('userData')
    //   .then((res: any) => {
    //     const url = `https://api.circuitvpn.com/proxy/server?country_code=${e}`;
    //     const headers = {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${res?.userData?.body?.access_token}`,
    //     };

    //     fetch(url, {
    //       method: 'GET',
    //       headers: headers,
    //     })
    //       .then((res) => {
    //         return res.json();
    //       })
    //       .then((response) => {
    //         content
    //           .getStorageModule()
    //           .setLocalStorageData('proxyServer', response?.body?.proxy_host)
    //           .then((res) => {
    //             content
    //               .getStorageModule()
    //               .setLocalStorageData('proxied', true)
    //               .then((res) => {
    //               });
    //           });
    //       });
    //   });
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

  const onSearchInputHandler = (e) => {
    console.log(e.target.value);
    let filterCountries = countryList.filter((country) =>
      country?.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCountryList(filterCountries);
  };

  return (
    <DashboardLayout>
      <div className='grid gird-rows-1 gap-6'>
        <div className='grid-cols-1'>
          <p
            className='text-2xl font-medium dark:text-white-100'
            onClick={() => navigate('/dashboard')}
          >
            {'< Country'}
          </p>
        </div>
        <div className='grid-cols-1'>
          <div className='relative'>
            <div className='absolute inset-y-0 start-0 flex items-center pl-2 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='text'
              onChange={onSearchInputHandler}
              className='border-transparent focus:border-transparent focus:ring-0 focus:outline-none block w-full pl-7 p-3.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:dark:bg-countr_card dark:border-gray-600 dark:placeholder-gray-400 dark:text-white-100'
              placeholder='Search Country'
            />
          </div>
        </div>
        <div className='grid-cols-1'>
          <div className='overflow-y-auto locationCard'>
            <div className='grid grid-rows-1 gap-7'>
              <div className='grid-cols-1'>
                <p className='text-base font-medium dark:text-white-100'>
                  Favourites
                </p>
                <p className='text-xs dark:text-white-100 mb-2'>
                  Your favourites countries will appear here
                </p>
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
                          onSelectCountry={onChangeCountry}
                          active={favourites[value?.code]}
                        />
                      )
                  )}
              </div>
              <div className='grid-cols-1'>
                <p className='text-base font-medium mb-2 dark:text-white-100'>
                  Locations
                </p>
                {countryList &&
                  countryList.length > 0 &&
                  countryList?.map((value, key) => (
                    <CountryCardChip
                      key={key}
                      isoCode={value?.code}
                      countryName={value?.name}
                      onMakeFavourite={onMakeFavourite}
                      onSelectCountry={onChangeCountry}
                      active={favourites[value?.code]}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Location;
