import { getUserAuth, bgResponse } from '../assets/utils/common';

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   if (msg == "firefox") {
//     // function handleProxyRequest(requestInfo) {
//     //   console.log(`Proxying: ${requestInfo.url}`);
//     //   return { type: "PROXY", host: "px012702.pointtoserver.com", port: 10780 };
//     // }

//     // browser.proxy.onRequest.addListener(handleProxyRequest, {
//     //   urls: ["<all_urls>"],
//     // });
//     // sendResponse(bgResponse(200, "Connected"));
//     // return true;
//     let proxySettings = {
//       proxyType: "manual",
//       ssl: "px012702.pointtoserver.com:10798",
//       socksVersion: 4,
//       httpProxyAll:true,
//     };

//     browser.proxy.settings.set({ value: proxySettings });
//     sendResponse(bgResponse(200, "Connected"));
//     return true;
//   }
// });

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
chrome.privacy.network.webRTCIPHandlingPolicy.set({
  value: 'default_public_interface_only',
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
