import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Layouts/Dashboard';

const settingList = [
  {
    icon: '',
    title: 'Account Details',
    component: '',
    onClick: () => {},
  },
  {
    icon: '',
    title: 'Rate Us',
    component: '',
    onClick: () => {},
  },
  {
    icon: '',
    title: 'Privacy Policy',
    component: '',
    onClick: () => {},
  },
  {
    icon: '',
    title: 'FAQs',
    component: '',
    onClick: () => {},
  },
  {
    icon: '',
    title: 'Lougout',
    component: '',
    onClick: () => {},
  },
];

const ListItemComponnet = ({ itemName }) => (
  <li className='pb-3'>
    <div className='flex items-center space-x-4 rtl:space-x-reverse'>
      <div className='flex-shrink-0'>
        <img
          className='w-8 h-8 rounded-full'
          src='/docs/images/people/profile-picture-1.jpg'
          alt='Neil image'
        />
      </div>
      <p className='text-base font-medium text-gray-900 truncate dark:text-white-100'>
        {itemName}
      </p>
      {/* <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
        $320
      </div> */}
    </div>
  </li>
);

const Settings = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className='grid gird-rows-1 gap-6'>
        <div className='grid-cols-1'>
          <p
            className='text-2xl font-medium dark:text-white-100'
            onClick={() => navigate('/dashboard')}
          >
            {'< Settings'}
          </p>
        </div>
        <div className='grid-cols-1'>
          <ul className='max-w-md divide-y divide-gray-200 dark:divide-gray-700'>
            {settingList.map((value, key) => (
              <ListItemComponnet key={key} itemName={value?.title} />
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Settings;
