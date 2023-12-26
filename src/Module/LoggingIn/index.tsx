import React, { useEffect } from 'react';
import axios from '../../utils/axiosInterceptor';
import { Content } from '../../Modules';
import { useNavigate } from 'react-router-dom';
const content = new Content();
const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    content
      .getAuthenticationModule()
      .getUserAuth()
      .then((response: any) => {
        let userAuthResponse = response?.userDetail;
        if (userAuthResponse?.auth_info) {
          navigate('/dashboard');
        }
      });
  }, []);

  const onLoginHandler = () => {
    chrome.runtime.sendMessage('LogIn', (tabId) => {
      content
        .getAuthenticationModule()
        .getUserAuth()
        .then((response: any) => {});
    });
  };

  return (
    <div>
      <button onClick={onLoginHandler}>Click</button>
    </div>
  );
};

export default Login;
