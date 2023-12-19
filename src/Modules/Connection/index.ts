export class Connection {
  private browser: any;
  constructor() {
    if (typeof window !== 'undefined') {
      //This code is executed in the browser
      this.browser = (window as any).browser;
    }
  }

  createConnection(browserType: string, proxyServer: any) {
    return new Promise(async (resolve, reject) => {
      if (browserType == 'firefox') {
        function handleProxyRequest() {
          return {
            type: 'http',
            host: proxyServer?.proxy_host,
            port: proxyServer?.proxy_port,
          };
        }
        this.browser.proxy.onRequest.addListener(handleProxyRequest, {
          urls: ['<all_urls>'],
        });

        // let proxySettings = {
        //   autoLogin: true,
        //   proxyType: 'manual',
        //   http: `${proxyServer?.proxy_host}:${proxyServer?.proxy_port}`,
        //   httpProxyAll: true,
        // };
        // let status = await this.browser.proxy.settings.set({
        //   value: proxySettings,
        // });
        // if (status == true) {
        //   resolve(true);
        // } else {
        //   reject(false);
        // }
      } else {
        const pacScript = `function FindProxyForURL(url, host) {
          if (isPlainHostName(host)) {
            return 'DIRECT';
          }
          return 'HTTPS ${proxyServer?.proxy_host}:${proxyServer?.proxy_port_https}';
        }`;

        const config = {
          mode: 'pac_script',
          pacScript: {
            data: pacScript,
          },
        };
        chrome.proxy.settings.set(
          {
            value: config,
          },
          () => {
            if (chrome.runtime.lastError) {
              reject(false);
            } else {
              resolve(true);
            }
          }
        );
      }
    });
  }
  getConnectionStatus() {
    return new Promise((resolve, reject) => {
      chrome.proxy.settings.get({}, (config) => {
        console.log({ config });
        if (config.levelOfControl === 'controlled_by_this_extension') {
          if (
            (config?.value && config?.value.mode === 'pac_script') ||
            config?.value?.ssl?.length > 0
          ) {
            resolve(true);
          } else {
            reject(false);
          }
        } else {
          reject(false);
        }
      });
    });
  }
  removeConnection() {
    const browserType =
      navigator.userAgent.toLowerCase().indexOf('firefox') > -1
        ? 'firefox'
        : 'chrome';
    return new Promise((resolve, reject) => {
      browserType == 'chrome'
        ? chrome.proxy.settings.set(
            {
              value: {
                mode: 'direct',
              },
              scope: 'regular',
            },
            () => resolve(true)
          )
        : this.browser.proxy.settings.set(
            {
              value: { proxyType: 'none' },
            },
            resolve(true)
          );
    });
  }
}
