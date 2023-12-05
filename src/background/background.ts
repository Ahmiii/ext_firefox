import { getUserAuth, bgResponse } from '../utils/common';
import { Content } from '../Modules';
let content = new Content();
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message == 'setConnection') {
    content
      .getConnectionModule()
      .createConnection()
      .then((res) => {
        sendResponse({ data: res });
      })
      .catch((error) => {
        sendResponse(error);
      });
    return true;
  }
  if (message == 'getConnection') {
    content
      .getConnectionModule()
      .getConnectionStatus()
      .then((res) => {
        sendResponse({ data: res });
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

chrome.webRequest.onAuthRequired.addListener(
  function (details) {
    return getUserAuth();
  },
  {
    urls: ['<all_urls>'],
  },
  ['blocking']
);
