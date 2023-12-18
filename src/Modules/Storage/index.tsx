export class Storage {
  constructor() {}

  setLocalStorageData(key: string, value: any) {
    return new Promise((resolve, reject) => {
      chrome.storage.local
        .set({ [key]: value })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getLocalStorageData(key: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local
        .get([key])
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
