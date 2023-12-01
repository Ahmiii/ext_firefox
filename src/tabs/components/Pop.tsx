import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Pop() {
  const navigate = useNavigate();
  const data=localStorage.getItem('userdetails')
  useEffect(() => {
    if(!data)
    {

        navigate('/')
    }
  }, []);

  return <div></div>;
}

export default Pop;
