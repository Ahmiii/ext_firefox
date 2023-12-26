export const bgResponse = (statusCode, message) => {
  return {
    status: statusCode,
    message: message,
  };
};

export const getUserAuth = async () => {
  let data = await chrome.storage.local.get(['userDetail']);
  return {
    authCredentials: {
      username: data?.userDetail?.user_info?.body?.vpn_username,
      password: data?.userDetail?.user_info?.body?.vpn_password,
    },
  };
};
