import { getUserAuth, bgResponse } from '../utils/common';
import { Content } from '../Modules';
let content = new Content();
const browserType =
  navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    ? 'firefox'
    : 'chrome';
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { messageType, browserType, proxyServer } = message;
  if (messageType == 'setConnection') {
    content
      .getConnectionModule()
      .createConnection(browserType, proxyServer)
      .then((res) => {
        sendResponse(res);
      })
      .catch((error) => {
        sendResponse(error);
      });
    return true;
  }
  if (messageType == 'getConnectionStatus') {
    content
      .getConnectionModule()
      .getConnectionStatus()
      .then((res) => {
        sendResponse(res);
      })
      .catch((error) => {
        sendResponse(error);
      });
    return true;
  }
  if (messageType == 'removeConnection') {
    content
      .getConnectionModule()
      .removeConnection(browserType)
      .then((res) => {
        sendResponse(res);
      })
      .catch((error) => {
        sendResponse(error);
      });
    return true;
  }
  if (message == 'getAuthenticUser') {
    content
      .getAuthenticationModule()
      .getUserAuth()
      .then((res) => {
        sendResponse(res);
      });
    return true;
  }
  if (message == 'LogIn') {
    content
      .getAuthenticationModule()
      .getUserLoggedIn()
      .then((res1: any) => {
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
          .then((res: any) => {
            chrome.tabs.remove(res1);
          });
        sendResponse(res1);
      });
    return true;
  }
});

browserType == 'chrome'
  ? chrome.webRequest.onAuthRequired.addListener(
      function (details, asyncCallback) {
        getUserAuth().then((response) => {
          return asyncCallback(response);
        });
      },
      {
        urls: ['<all_urls>'],
      },
      ['asyncBlocking']
    )
  : chrome.webRequest.onAuthRequired.addListener(
      function (details) {
        return getUserAuth().then((response) => response);
      },
      {
        urls: ['<all_urls>'],
      },
      ['blocking']
    );
