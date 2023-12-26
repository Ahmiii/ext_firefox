import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Layouts/Dashboard';
import Modal from '../../Molecule/Modal';
import {
  UserDetailIcon,
  StarIcon,
  PrivacyPolicyIcon,
  FaqsIcon,
  ArrowRightIcon,
  LogoutIcon,
} from '../../Atoms/CustomIcon';
const settingList = (setShowLogoutModal) => [
  {
    icon: <UserDetailIcon />,
    title: 'Account Details',
    component: '',
    action: <ArrowRightIcon />,
    onClick: () => {},
  },
  {
    icon: <StarIcon />,
    title: 'Rate Us',
    component: '',
    onClick: () => {},
  },
  {
    icon: <PrivacyPolicyIcon />,
    title: 'Privacy Policy',
    component: '',
    onClick: () => {},
  },
  {
    icon: <FaqsIcon />,
    title: 'FAQs',
    component: '',
    onClick: () => {},
  },
  {
    icon: <LogoutIcon />,
    title: 'Lougout',
    component: '',
    onClick: () => {
      setShowLogoutModal(true);
    },
  },
];

const ListItemComponnet = ({ icon, itemName, action, onClick }) => (
  <li onClick={onClick} className='p-5 cursor-pointer'>
    <div className='flex justify-between items-center'>
      <div className='flex space-x-4'>
        <div className='flex-shrink-0'>{icon}</div>
        <p className='text-base font-medium text-gray-900 truncate dark:text-white-100'>
          {itemName}
        </p>
      </div>
      {action && (
        <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
          {action}
        </div>
      )}
    </div>
  </li>
);

const Settings = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <DashboardLayout>
        <div className='grid gird-rows-1 gap-6'>
          <div className='grid-cols-1'>
            <p
              className='text-2xl font-medium dark:text-white-100 cursor-pointer'
              onClick={() => navigate('/dashboard')}
            >
              {'< Settings'}
            </p>
          </div>
          <div className='grid-cols-1'>
            <ul className='max-w-md divide-y divide-gray-200 dark:divide-gray-700'>
              {settingList(setShowLogoutModal).map((value, key) => (
                <ListItemComponnet
                  onClick={value?.onClick}
                  key={key}
                  icon={value?.icon}
                  itemName={value?.title}
                  action={value?.action}
                />
              ))}
            </ul>
          </div>
        </div>
      </DashboardLayout>
      <Modal onCloseModal={setShowLogoutModal} show={showLogoutModal} />
    </>
  );
};
export default Settings;
