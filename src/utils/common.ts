import { Content } from '../Modules';

export const bgResponse = (statusCode, message) => {
  return {
    status: statusCode,
    message: message,
  };
};

export const getUserAuth = () => {
  chrome.storage.local.get(['userDetail']).then((response) => {
    return {
      authCredentials: {
        username: response?.userDetail?.user_info?.body?.vpn_username,
        password: response?.userDetail?.user_info?.body?.vpn_password,
      },
    };
  });
};
