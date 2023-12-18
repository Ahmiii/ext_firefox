import { Connection } from './Connection';
import { Authentication } from './Authentication';
import { Location } from './Location';
import { Storage } from './Storage';

class Content {
  private connectionModule: Connection;
  private authenticationModule: Authentication;
  private location: Location;
  private storage: Storage;

  constructor() {
    this.connectionModule = new Connection();
    this.authenticationModule = new Authentication();
    this.location = new Location();
    this.storage = new Storage();
  }

  getConnectionModule(): Connection {
    return this.connectionModule;
  }

  getAuthenticationModule(): Authentication {
    return this.authenticationModule;
  }

  getLocationModule(): Location {
    return this.location;
  }

  getStorageModule(): Storage {
    return this.storage;
  }
}
export { Content };
