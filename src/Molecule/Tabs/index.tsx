import React from 'react';
import Tab from '../../Atoms/Tab';

const Tabs = ({ tabs }) => {

  return (
    <div className={`grid grid-cols-3 gap-4`}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          onClick={tab.onClick}
          tabPath={tab.path}
          tabText={tab.text}
          svgPath={tab.svgPath}
        />
      ))}
    </div>
  );
};
export default Tabs;
