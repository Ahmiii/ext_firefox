export class Connection {
  private browser: any;
  constructor() {
    if (typeof window !== 'undefined') {
      //This code is executed in the browser
      this.browser = (window as any).browser;
    }
  }

  createConnection(browserType: string, proxyServer: string) {
    return new Promise(async (resolve, reject) => {
      if (browserType == 'firefox') {
        function shouldProxyRequest(requestInfo) {
          console.log({ requestInfo });
          return requestInfo.parentFrameId == -1;
        }

        function handleProxyRequest(requestInfo) {
          if (shouldProxyRequest(requestInfo)) {
            console.log(`Proxying: ${requestInfo.url}`);
            return { type: 'https', host: `${proxyServer}`, port: 10798 };
          }
          return { type: 'direct' };
        }

        this.browser.proxy.onRequest.addListener(handleProxyRequest, {
          urls: ['<all_urls>'],
        });

        // let proxySettings = {
        //   proxyType: 'manual',
        //   http: `${proxyServer}:10780`,
        //   socksVersion: 4,
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
          return 'HTTPS ${proxyServer}:10798';
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
        if (config.levelOfControl === 'controlled_by_this_extension') {
          console.log({ config });
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
}
