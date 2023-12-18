import React from 'react';
import DashboardLayout from '../../Layouts/Dashboard';
import CountryCardChip from '../../Molecule/LocationCard';
import './style.css';
const countryList = [
  { icon: 'US', countryName: 'United States' },
  { icon: 'US', countryName: 'United States' },
  { icon: 'US', countryName: 'United States' },
  { icon: 'US', countryName: 'United States' },
  { icon: 'US', countryName: 'United States' },
  { icon: 'US', countryName: 'United States' },
  { icon: 'US', countryName: 'United States' },
  { icon: 'US', countryName: 'United States' },
  { icon: 'US', countryName: 'United States' },
  { icon: 'US', countryName: 'United States' },
  { icon: 'US', countryName: 'United States' },
];

const Location = () => {
  return (
    <DashboardLayout>
      <div className='grid gird-rows-1'>
        <div className='grid-cols-1'>
          <div className='overflow-y-auto locationCard'>
            {countryList.map((value, key) => (
              <CountryCardChip
                key={key}
                isoCode={value.icon}
                countryName={value.countryName}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Location;
