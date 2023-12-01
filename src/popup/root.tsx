import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../tabs/components/Login";
import Home from "../tabs/components/Home";
import About from "../tabs/components/About";

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
};

const Root = () => {
  return (
    <Router>
      {/* <Pop /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default Root;
