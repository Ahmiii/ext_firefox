import React from 'react';
import DashboardLayout from '../../Layouts/Dashboard';
import './style.css';

const Location = () => {
  return (
    <DashboardLayout>
      <div className='grid gird-rows-1'>
        <div className='grid-cols-1'>
          <div className='overflow-y-auto locationCard'>
            <div className='rounded-lg place-self-center p-4 dark:bg-countr_card'>
              <div className='flex items-center space-x-4'>
                <div className='flex-shrink-0'>
                  <img
                    className='w-8 h-8 rounded-full'
                    src='https://flowbite.com/docs/images/people/profile-picture-1.jpg'
                    alt='Neil image'
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                    email@windster.com
                  </p>
                </div>
                <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  <span className='text-yellow-100'>★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Location;
