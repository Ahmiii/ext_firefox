import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Layouts/Dashboard';
import { Content } from '../../Modules';
import axios from '../../utils/axiosInterceptor';
import CountryIcon from '../../Atoms/CountryCardIcon';
import CountryCardContent from '../../Atoms/CountryCardContent';
const content = new Content();
const browserType =
  navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    ? 'firefox'
    : 'chrome';

const Dashboard = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connectionDetail, setConnectionDetail] = useState({
    isoCode: '',
    countryName: '',
  });

  useEffect(() => {
    content
      .getStorageModule()
      .getLocalStorageData('proxyConfig')
      .then((proxyConfigResponse: any) => {
        let proxyConfigration = proxyConfigResponse?.proxyConfig;
        setConnectionDetail(proxyConfigration);
        if (proxyConfigration?.proxied == true) {
          chrome.runtime.sendMessage(
            {
              messageType: 'setConnection',
              browserType: browserType,
              proxyServer: proxyConfigration?.proxyServer,
            },
            () => setChecked(true)
          );
        }
      });

    content
      .getStorageModule()
      .getLocalStorageData('proxyConfig')
      .then((proxyConfigResponse: any) => {
        let proxyConfigration = proxyConfigResponse?.proxyConfig;
        if (proxyConfigration?.isChangeProxyServer) {
          setLoading(true);
          axios
            .get(`/proxy/server?country_code=${proxyConfigration?.isoCode}`)
            .then((proxyReceieveResponse) => {
              let proxyServerResponse = proxyReceieveResponse?.data;
              if (proxyServerResponse.header?.response_code == 200) {
                chrome.runtime.sendMessage(
                  {
                    messageType: 'setConnection',
                    browserType: browserType,
                    proxyServer: proxyServerResponse?.body,
                  },
                  () => {
                    let updateConfig = {
                      ...proxyConfigration,
                      isChangeProxyServer: false,
                      proxied: true,
                      proxyServer: proxyServerResponse?.body,
                    };
                    content
                      .getStorageModule()
                      .setLocalStorageData('proxyConfig', updateConfig)
                      .then((res) => {
                        setConnectionDetail(updateConfig);
                        setLoading(false);
                        setChecked(true);
                      })
                      .catch((error) => console.log({ error }));
                  }
                );
              }
            })
            .catch((error) => console.log({ error }));
        }
      })
      .catch((error) => console.log({ error }));
  }, []);

  const handleChange = async () => {
    let proxyConfigration = await content
      .getStorageModule()
      .getLocalStorageData('proxyConfig')
      .then((res: any) => res?.proxyConfig);
    if (!checked) {
      setLoading(true);
      await axios
        .get(`/proxy/server?country_code=${proxyConfigration?.isoCode}`)
        .then((proxyReceieveResponse) => {
          let proxyServerResponse = proxyReceieveResponse?.data;
          if (proxyServerResponse.header?.response_code == 200) {
            chrome.runtime.sendMessage(
              {
                messageType: 'setConnection',
                browserType: browserType,
                proxyServer: proxyServerResponse?.body,
              },
              () => {
                let updateConfig = {
                  ...proxyConfigration,
                  isChangeProxyServer: false,
                  proxied: true,
                  proxyServer: proxyServerResponse?.body,
                };

                content
                  .getStorageModule()
                  .setLocalStorageData('proxyConfig', updateConfig)
                  .then((res) => {
                    setLoading(false);
                    setChecked(true);
                  })
                  .catch((error) => console.log({ error }));
              }
            );
          }
        });
    } else {
      chrome.proxy.settings.clear({}, () => {
        let updateConfig = {
          ...proxyConfigration,
          isChangeProxyServer: false,
          proxied: false,
          proxyServer: '',
        };
        content
          .getStorageModule()
          .setLocalStorageData('proxyConfig', updateConfig)
          .then((res) => {
            setChecked(false);
          })
          .catch((error) => console.log({ error }));
      });
    }
  };

  return (
    <DashboardLayout>
      <div className='grid gird-rows-1 h-full'>
        <div className='grid-cols-1'>
          <div className='flex flex-col'>
            <p
              className={`font-semibold	text-2xl ${
                checked
                  ? 'text-green-100'
                  : loading
                  ? 'dark:text-white-100'
                  : 'text-red'
              }`}
            >
              {checked
                ? 'Connected'
                : loading
                ? 'Connecting ...'
                : 'Unprotected'}
            </p>
            <p className='text-black text-xl dark:text-white-100'>
              {checked
                ? 'Your connection is secured'
                : loading
                ? 'Looking for fastest VPN server'
                : 'Connect to stay safe'}
            </p>
          </div>
        </div>
        <div className='grid-cols-1'>
          <div className='h-full flex flex-col items-center justify-center'>
            <label
              htmlFor='toggle'
              className='flex items-center cursor-pointer relative'
            >
              <div className='relative'>
                <input
                  id='toggle'
                  type='checkbox'
                  className='sr-only'
                  checked={checked}
                  onChange={handleChange}
                  disabled={loading}
                />
                <div
                  className={`bg-toogle_white fill-white-100 dark:bg-gray-600 w-26 h-14 rounded-full ${
                    loading ? 'opacity-50 pointer-events-none' : ''
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white-100 w-12 h-12 rounded-full transition transform ${
                    checked ? 'translate-x-full bg-green-100' : ''
                  } ${loading ? 'translate-x-full' : ''}`}
                >
                  <svg
                    width='40'
                    height='45'
                    viewBox='0 0 11 27'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M10.0587 1.86341C10.1543 0.807674 8.75724 0.348361 8.20767 1.25483L0.290717 14.313C-0.11333 14.9795 0.36648 15.8315 1.14583 15.8315H4.23538C4.82325 15.8315 5.28429 16.3361 5.23131 16.9216L4.47185 25.3145C4.37632 26.3703 5.77332 26.8295 6.32289 25.9231L14.2399 12.865C14.644 12.1985 14.1642 11.3465 13.3848 11.3465H10.295C9.7071 11.3465 9.24605 10.8419 9.29905 10.2564L10.0587 1.86341Z'
                      className={`${
                        !checked ? 'fill-toogle_white' : 'fill-white-100'
                      }  dark:fill-gray-600`}
                      // fill='#222A2F'
                    />
                  </svg>
                </div>
              </div>
            </label>
            <p className='text-xl mt-6 dark:text-white-100'>
              {checked
                ? 'Click To Disconnect'
                : loading
                ? 'Connecting'
                : 'Click To Connect'}
            </p>
          </div>
        </div>
        <div className='grid-cols-1'>
          <div className='h-full flex flex-col justify-center'>
            {connectionDetail?.isoCode.length && (
              <div className='h-18 w-full p-4 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 place-self-center'>
                <div className='flex items-center space-x-4'>
                  <CountryIcon isoCode={connectionDetail?.isoCode} />
                  <CountryCardContent
                    countryName={connectionDetail?.countryName}
                    countryDescription='Selected Server'
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
