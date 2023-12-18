import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '../../Molecule/Tabs';
export default (props) => {
  const navigate = useNavigate();

  console.log('location', { location });

  const onClickCountryTab = () => {
    navigate('/countries');
  };
  const onClickHomeTab = () => {
    navigate('/dashboard');
  };
  const onClickSettingsTab = () => {
    navigate('/settings');
  };

  const tabList = [
    {
      onClick: onClickCountryTab,
      path: '/countries',
      text: 'Countries',
      svgPath: (
        <path
          fillRule='evenodd'
          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6.5 6.326a6.52 6.52 0 01-1.5.174 6.487 6.487 0 01-5.011-2.36l.49-.98a.423.423 0 01.614-.164l.294.196a.992.992 0 001.491-1.139l-.197-.593a.252.252 0 01.126-.304l1.973-.987a.938.938 0 00.361-1.359.375.375 0 01.239-.576l.125-.025A2.421 2.421 0 0012.327 6.6l.05-.149a1 1 0 00-.242-1.023l-1.489-1.489a.5.5 0 01-.146-.353v-.067a6.5 6.5 0 015.392 9.23 1.398 1.398 0 00-.68-.244l-.566-.566a1.5 1.5 0 00-1.06-.439h-.172a1.5 1.5 0 00-1.06.44l-.593.592a.501.501 0 01-.13.093l-1.578.79a1 1 0 00-.553.894v.191a1 1 0 001 1h.5a.5.5 0 01.5.5v.326z'
          clipRule='evenodd'
        />
      ),
    },
    {
      onClick: onClickHomeTab,
      path: '/dashboard',
      text: 'Home',
      svgPath: (
        <path
          fillRule='evenodd'
          d='M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z'
          clipRule='evenodd'
        />
      ),
    },
    {
      onClick: onClickSettingsTab,
      path: '/settings',
      text: 'Settings',
      svgPath: (
        <path
          fillRule='evenodd'
          d='M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z'
          clipRule='evenodd'
        />
      ),
    },
  ];

  return (
    <div className="h-screen container p-4 bg-white-30 bg-[url('../assets/white_map.svg')] dark:bg-black dark:bg-[url('../assets/map.svg')] bg-no-repeat bg-center">
      <div className='h-full flex flex-col justify-between'>
        {props.children}
        <Tabs tabs={tabList} />
      </div>
    </div>
  );
};
