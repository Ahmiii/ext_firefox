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
      });
    return true;
  }
  if (message == 'getConnection') {
    console.log('yaha aya');
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
});
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message == 'connection') {
//     let proxySettings = {
//       proxyType: 'manual',
//       http: 'px012702.pointtoserver.com:10780',
//       socksVersion: 4,
//       httpProxyAll: true,
//     };

//     chrome.proxy.settings.set({ value: proxySettings });
//     sendResponse(true);
//   }
// });
// // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// //   if (message == 'connection') {
// //     let proxySettings = {
// //       proxyType: 'manual',
// //       http: 'px012702.pointtoserver.com:10780',
// //       socksVersion: 4,
// //       httpProxyAll: true,
// //     };

// //     browser.proxy.settings.set({ value: proxySettings });
// //     chrome.privacy.network.webRTCIPHandlingPolicy.set({
// //       value: 'disable_non_proxied_udp',
// //     });
// //   }
// // });
// // {
// // }

chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
  if (tabId === tab.id && changeInfo.status === 'complete') {
    if (
      tab.url === 'https://authentication.circuitvpn.com/login/proxy/success'
    ) {
      console.log('yaha tak ao');
      chrome.cookies.get(
        { url: 'https://authentication.circuitvpn.com', name: 'auth_info' },
        (cookie) => {
          if (cookie) {
            if (cookie.hasOwnProperty('value') !== false) {
              const userData = JSON.parse(decodeURIComponent(cookie.value));
              chrome.storage.local.set({ userData }, () => {
                chrome.tabs.remove(tabId);
                console.log('User data saved to local storage');
              });
            }
          }
        }
      );
      chrome.tabs.onUpdated.removeListener(listener);
    }
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
