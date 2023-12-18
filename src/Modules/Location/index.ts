import { Storage } from '../Storage';
export class Location {
  private storage = new Storage();
  constructor() {}

  setFavourites(value) {
    return new Promise((resolve, reject) => {
      this.storage
        .setLocalStorageData('favourites', value)
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
      this.storage
        .getLocalStorageData('favourites')
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
