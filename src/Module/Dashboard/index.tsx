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
          console.log('yaaha ae ho');
          chrome.runtime.sendMessage(
            { messageType: 'setConnection', browserType: browserType },
            (res) => {
              console.log({ res });
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
    setLoading(true);
    if (!checked) {
      setTimeout(() => {
        setChecked(true);
      }, 2000);
    } else {
      chrome.proxy.settings.clear({}, () => {
        setLoading(false);
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
              <p className='text-black text-2xl dark:text-white-100'>heading</p>
              <p className='text-black text-xl dark:text-white-100'>description</p>
            </div>
            <div>image</div>
          </div>
        </div>
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
              className={`bg-gray-600 w-14 h-8 rounded-full ${
                loading ? 'opacity-50 pointer-events-none' : ''
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
                checked ? 'translate-x-full bg-green-500' : ''
              } ${loading ? 'hidden' : ''}`}
            ></div>
            {loading && (
              <div className='absolute top-0 left-0 mt-1 ml-1 animate-spin rounded-full border-t-2 border-b-2 border-gray-900 h-6 w-6'></div>
            )}
          </div>
          <div className='ml-3 text-white font-medium'>Toggle</div>
        </label>
        <div className='grid-cols-1'>3</div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
