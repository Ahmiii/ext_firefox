import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  // navigate("/dashboard");

  useEffect(() => {
    // navigate("/dashboard");
    chrome.storage.local.get('userData', async (result) => {
      if (result?.userData) {
        navigate('/dashboard');
      } else {
        chrome.permissions.getAll((res) => console.log({res}));
        const loginURL = `https://authentication.circuitvpn.com/login?time=${Date.now()}&&device_type=proxy`;

        chrome.windows.create(
          {
            url: loginURL,
            type: 'popup',
            width: 600,
            height: 400,
          },
          (newWindow) => {
            const newWindowId = newWindow.id;
          }
        );
      }
    });
  }, []);

  return <div></div>;
};

export default Login;
