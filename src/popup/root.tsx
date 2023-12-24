import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../Module/LoggingIn';
import Dashboard from '../Module/Dashboard';
import Location from '../Module/Location';
import About from '../Module/Settings';
const Root = () => {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/countries' element={<Location />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/settings' element={<About />} />
        </Routes>
      </Router>
  );
};

export default Root;
