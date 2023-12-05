export class Connection {
  private browser: any;
  constructor() {
    this.browser = (window as any).browser;
  }

  createConnection() {
    return new Promise(async (resolve, reject) => {
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
    });
  }
  getConnectionStatus() {
    chrome.proxy.settings.get({}, (config) => {
      console.log({ config });
      if (config.levelOfControl === 'controlled_by_this_extension') {
        if (
          (config.value && config.value.mode === 'pac_script') ||
          config.value.ssl.length > 0
        ) {
          return true;
        }
      }
    });
  }
}
