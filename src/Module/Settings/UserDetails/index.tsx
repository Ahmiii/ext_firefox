import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../Layouts/Dashboard';
import { Content } from '../../../Modules';
const content = new Content();
const UserDetailsList = (userDetails) => {
  return [
    {
      title: 'VPN Username',
      description: userDetails?.vpn_username,
    },
    {
      title: 'Email',
      description: userDetails?.email,
    },
    {
      title: 'Subscription Type',
      description: userDetails?.client_type,
    },
    {
      title: 'Subscription Status',
      description: userDetails?.status,
    },
    {
      title: 'Billing Cycle',
      description: userDetails?.billing_cycle,
    },
  ];
};
const ListItemComponnet = ({ title, description }) => (
  <li className='p-3'>
    <div className='flex flex-col space-y-1'>
      <p className='text-base font-medium text-gray-900 dark:text-white-100'>
        {title}
      </p>
      <p className='text-sm text-gray-900 dark:text-white-100'>
        {description}
      </p>
    </div>
  </li>
);

const UserDetails = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState('');

  useEffect(() => {
    content
      .getAuthenticationModule()
      .getUserAuth()
      .then((response: any) => {
        setUserDetails(response?.userDetail?.user_info?.body);
      });
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className='grid gird-rows-1 gap-6'>
          <div className='grid-cols-1'>
            <p
              className='text-2xl font-medium dark:text-white-100 cursor-pointer'
              onClick={() => navigate('/settings')}
            >
              {'< Account Details'}
            </p>
          </div>
          <div className='grid-cols-1'>
            <ul className='max-w-md divide-y divide-gray-200 dark:divide-gray-700'>
              {UserDetailsList(userDetails).map((value, key) => (
                <ListItemComponnet
                  key={key}
                  title={value?.title}
                  description={value?.description}
                />
              ))}
            </ul>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};
export default UserDetails;
