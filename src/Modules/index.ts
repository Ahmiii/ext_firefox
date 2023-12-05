import { Connection } from './Connection';
import { Authentication } from './Authentication';

class Content {
  private connectionModule: Connection;
  private authenticationModule: Authentication;

  constructor() {
    this.connectionModule = new Connection();
    this.authenticationModule = new Authentication();
  }

  getConnectionModule(): Connection {
    return this.connectionModule;
  }

  getAuthenticationModule(): Authentication {
    return this.authenticationModule;
  }
}
export { Content };
