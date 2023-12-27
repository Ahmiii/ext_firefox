import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../Module/Landing';
import Login from '../Module/LoggingIn';
import Dashboard from '../Module/Dashboard';
import Location from '../Module/Location';
import Settings from '../Module/Settings';
import UserDetails from '../Module/Settings/UserDetails';
const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/countries' element={<Location />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/settings/account-details' element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default Root;
