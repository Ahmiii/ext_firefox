import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    chrome.runtime.sendMessage('getAuthenticUser', (res) => {
      if (res?.userData) {
        const url = 'https://api.circuitvpn.com/proxy/countries';
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${res?.userData?.body?.access_token}`,
        };

        fetch(url, {
          method: 'GET',
          headers: headers,
        })
          .then((res) => {
            return res.json();
          })
          .then((response) => {
            if (response?.header?.response_code == 200) {
              console.log();
              chrome.storage.local
                .set({ countryList: response?.body })
                .then((res) => {
                  navigate('/dashboard');
                })
                .catch((error) => {
                  navigate('/dashboard');
                });
            }
          });
      }
    });
  }, []);

  const onLoginHandler = () => {
    chrome.runtime.sendMessage('LogIn', (res) => {});
  };

  return (
    <div>
      <button onClick={onLoginHandler}>Click</button>
    </div>
  );
};

export default Login;
