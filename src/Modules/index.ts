// chrome.runtime.sendMessage('I am loading content script', (response) => {
//     console.log(response);
//     console.log('I am content script')

// })

// window.onload = (event) => {
//     console.log('page is fully loaded');
// };
import { Connection } from './Connection';

class Content {
  private connectionModule: Connection;
  constructor() {
    this.connectionModule = new Connection();
  }

  getConnectionModule(): Connection {
    return this.connectionModule;
  }
}
export { Content };
