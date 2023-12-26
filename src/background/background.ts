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
  if (messageType == 'removeConnection') {
    content
      .getConnectionModule()
      .removeConnection()
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
      .then((res) => {
        sendResponse(res);
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
