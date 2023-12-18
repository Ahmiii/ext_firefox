export class Location {
  constructor() {}
  setFavourites(key, value) {
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
  getFavourites() {
    return new Promise((resolve, reject) => {
      chrome.storage.local
        .get(['favourites'])
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
