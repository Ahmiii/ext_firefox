import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '../../Layouts/Dashboard';
const browserType =
  navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    ? 'firefox'
    : 'chrome';
const Dashboard = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chrome.runtime.sendMessage('getConnection', (res) => {
      if (res == true) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    });
  }, []);

  useEffect(() => {
    if (checked) {
      chrome.runtime.sendMessage('getConnection', (res) => {
        if (!res) {
          chrome.runtime.sendMessage(
            { messageType: 'setConnection', browserType: browserType },
            (res) => {
              setLoading(false);
              if (res == true) {
                setChecked(true);
              } else {
                setChecked(false);
              }
            }
          );
        }
      });
    }
  }, [checked]);

  const handleChange = () => {
    if (!checked) {
      setLoading(true);
      setTimeout(() => {
        setChecked(true);
      }, 2000);
    } else {
      chrome.proxy.settings.clear({}, () => {
        // setLoading(false);
        setChecked(false);
      });
    }
  };

  return (
    <DashboardLayout>
      <div className='h-full grid grid-rows-3'>
        <div className='grid-cols-1'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col'>
              <p
                className={`font-semibold	text-2xl ${
                  checked ? 'text-green-100' : 'text-red'
                }`}
              >
                {checked ? 'Connected' : 'Unprotected'}
              </p>
              <p className='text-black text-xl dark:text-white-100'>
                {checked
                  ? 'Your connection is secured'
                  : 'Connect to stay safe'}
              </p>
            </div>
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
                  className={`bg-gray-600 w-26 h-14 rounded-full ${
                    loading ? 'opacity-50 pointer-events-none' : ''
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white-100 w-12 h-12 rounded-full transition transform ${
                    checked ? 'translate-x-full bg-green-100' : ''
                  } ${loading ? 'translate-x-full' : ''}`}
                >
                  {loading ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='40'
                      height='54'
                      viewBox='0 0 20 27'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
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
                        fill='#222A2F'
                      />
                    </svg>
                  )}
                </div>
              </div>
            </label>
            <p className='text-xl mt-6 dark:text-white-100'>
              {checked ? 'Click To Disconnect' : 'Click To Connect'}
            </p>
          </div>
        </div>
        <div className='grid-cols-1'>
          <div className='h-full flex flex-col justify-center'>
            <div className='p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
              <div className='flex items-center space-x-4'>
                <div className='flex-shrink-0'>
                  <img
                    className='w-8 h-8 rounded-full'
                    src='https://flowbite.com/docs/images/people/profile-picture-1.jpg'
                    alt='Neil image'
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                    Neil Sims
                  </p>
                  <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                    email@windster.com
                  </p>
                </div>
                <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  $320
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
