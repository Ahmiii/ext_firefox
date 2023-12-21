import axios from 'axios';
import { Content } from '../Modules';
let content = new Content();

const authInterceptors = axios.create({
  baseURL: 'https://api.circuitvpn.com',
});
authInterceptors.interceptors.request.use(
  (config) => {
    return content
      .getStorageModule()
      .getLocalStorageData('userData')
      .then((res: any) => {
        console.log({ res });
        let token = res?.userData?.body;
        if (token?.access_token) {
          config.headers['Content-Type'] = `application/json`;
          config.headers['Authorization'] = `Bearer ${token.access_token}`;
        }
        return config;
      });
  },
  (error) => Promise.reject(error)
);
export default authInterceptors;
