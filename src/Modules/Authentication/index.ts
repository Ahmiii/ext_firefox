export class Authentication {
  private loginUrl: string;
  constructor() {
    this.loginUrl = `https://authentication.circuitvpn.com/login?time=${Date.now()}&&device_type=proxy`;
  }

  getUserAuth() {
    return new Promise((resolve, reject) => {
      chrome.storage.local
        .get(['userData'])
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  setUserAuth(userData) {
    return new Promise((resolve, reject) => {
      chrome.storage.local
        .set({ userData })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getUserLoggedIn() {
    console.log('yata ak aya')
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
                chrome.cookies.get(
                  {
                    url: 'https://authentication.circuitvpn.com',
                    name: 'auth_info',
                  },
                  (cookie) => {
                    if (cookie) {
                      if (cookie.hasOwnProperty('value') !== false) {
                        const userData = JSON.parse(
                          decodeURIComponent(cookie.value)
                        );
                        setUserAuth(userData).then((res) => {
                          chrome.tabs.remove(tabId);
                          resolve(res);
                        });
                      }
                    }
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
