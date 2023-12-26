import React from 'react';

const LandingLayout = () => {
  return (
    <div className="h-screen container p-4 bg-white-30 bg-[url('../assets/white_map.svg')] dark:bg-black dark:bg-[url('../assets/map.svg')] bg-no-repeat bg-center">
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <img src={require(`../../assets/Logo.png`).default} />
        <p className='text-base dark:text-white-100'>Loading...</p>
      </div>
    </div>
  );
};

export default LandingLayout;
