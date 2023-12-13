import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   chrome.runtime.sendMessage('getAuthenticUser', (res) => {
  //     if (res?.userData) {
  //       navigate('/dashboard');
  //     }
  //   });
  // }, []);

  const onLoginHandler = () => {
    navigate('/dashboard');

    // chrome.runtime.sendMessage('LogIn', (res) => {});
  };

  return (
    <div>
      <button onClick={onLoginHandler}>Click</button>
    </div>
  );
};

export default Login;
