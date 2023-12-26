export class Connection {
  private browser: any;
  constructor() {
    if (typeof window !== 'undefined') {
      this.browser = (window as any).browser;
    }
  }

  createConnection(browserType: string, proxyServer: any) {
    return new Promise(async (resolve, reject) => {
      if (browserType == 'firefox') {
        // function handleProxyRequest() {
        //   return {
        //     type: 'http',
        //     host: proxyServer?.proxy_host,
        //     port: proxyServer?.proxy_port,
        //   };
        // }
        // this.browser.proxy.onRequest.addListener(handleProxyRequest, {
        //   urls: ['<all_urls>'],
        // });

        let proxySettings = {
          autoLogin: true,
          proxyType: 'manual',
          http: `${proxyServer?.proxy_host}:${proxyServer?.proxy_port}`,
          httpProxyAll: true,
        };
        let status = await this.browser.proxy.settings.set({
          value: proxySettings,
        });
        if (status == true) {
          resolve(true);
        } else {
          reject(false);
        }
        // resolve(true);
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
  removeConnection(browserType) {
    return new Promise(async (resolve, reject) => {
      let proxySettings = {
        autoLogin: false,
        proxyType: 'none',
        http: '',
        httpProxyAll: false,
      };
      browserType == 'firefox'
        ? await this.browser.proxy.settings.set({
            value: proxySettings,
          })
        : chrome.proxy.settings.clear({}, () => {});

      resolve(true);
    });
  }
}
