export class Connection {
  private browser: any;
  constructor() {
    if (typeof window !== 'undefined') {
      //This code is executed in the browser
      this.browser = (window as any).browser;
    }
  }

  createConnection(browserType: string) {
    return new Promise(async (resolve, reject) => {
      if (browserType == 'firefox') {
        let proxySettings = {
          proxyType: 'manual',
          http: 'px012702.pointtoserver.com:10780',
          socksVersion: 4,
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
      } else {
        const pacScript = `function FindProxyForURL(url, host) {
          if (isPlainHostName(host)) {
            return 'DIRECT';
          }
          return 'HTTPS px012702.pointtoserver.com:10798';
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
