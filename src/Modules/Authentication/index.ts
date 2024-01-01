import { Storage } from '../Storage';
export class Authentication {
  private loginUrl: string;

  constructor() {
    this.loginUrl = `https://authentication.circuitvpn.com/login?time=${Date.now()}&&device_type=proxy`;
  }

  getUserAuth() {
    return new Promise((resolve, reject) => {
      chrome.storage.local
        .get(['userDetail', 'countryList'])
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  setUserAuth(value: any) {
    const storage = new Storage();
    return new Promise((resolve, reject) => {
      storage
        .setLocalStorageData('userDetail', value)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getUserLoggedIn() {
    const setUserAuth = this.setUserAuth;
    return new Promise((resolve, reject) => {
      chrome.windows.create(
        {
          url: this.loginUrl,
          type: 'popup',
          width: 600,
          height: 400,
        },
        (newWindow) => {
          chrome.tabs.onUpdated.addListener(function listener(
            tabId,
            changeInfo,
            tab
          ) {
            if (tabId === tab.id && changeInfo.status === 'complete') {
              if (
                tab.url ===
                'https://authentication.circuitvpn.com/login/proxy/success'
              ) {
                chrome.cookies.getAll(
                  {
                    url: 'https://authentication.circuitvpn.com',
                  },
                  (cookies) => {
                    let cookieObj = {};
                    let filtercookies = cookies.filter((value) => {
                      return (
                        value.name === 'auth_info' || value.name === 'user_info'
                      );
                    });
                    filtercookies.map((cookie) => {
                      cookieObj[cookie.name] = JSON.parse(
                        decodeURIComponent(cookie?.value)
                      );
                    });
                    setUserAuth(cookieObj)
                      .then((res) => {
                        resolve(tabId);
                      })
                      .catch((error) => {
                        reject(error);
                      });
                  }
                );
              }
            }
          });
        }
      );
    });
  }
}
