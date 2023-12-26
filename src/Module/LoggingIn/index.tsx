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
        .then((response: any) => {
          let initialProxy = {
            countryName: 'United States',
            isChangeProxyServer: false,
            isoCode: 'US',
            proxied: false,
            proxyServer: {
              proxy_host: '',
              proxy_ip_address: '',
              proxy_port: '',
              proxy_port_https: '',
            },
          };
          content
            .getStorageModule()
            .setLocalStorageData('proxyConfig', initialProxy)
            .then((res) => {
              chrome.tabs.remove(tabId);
            });
          // let authResponse = response?.userDetail;
          // if (authResponse?.auth_info?.header?.response_code == 200) {
          //   axios.get('/proxy/countries').then((response: any) => {
          //     let countryResponse = response?.data;
          //     if (countryResponse?.header?.response_code == 200) {
          //       content
          //         .getStorageModule()
          //         .setLocalStorageData('countryList', countryResponse?.body)
          //         .then((res) => {
          //           let initialProxy = {
          //             countryName: 'United States',
          //             isChangeProxyServer: false,
          //             isoCode: 'US',
          //             proxied: false,
          //             proxyServer: {
          //               proxy_host: '',
          //               proxy_ip_address: '',
          //               proxy_port: '',
          //               proxy_port_https: '',
          //             },
          //           };
          //           content
          //             .getStorageModule()
          //             .setLocalStorageData('proxyConfig', initialProxy);
          //           chrome.tabs.remove(tabId);
          //         });
          //     }
          //   });
          // }
        });
    });
  };

  return (
    <div>
      <button onClick={onLoginHandler}>Click</button>
    </div>
  );
};

export default Login;
