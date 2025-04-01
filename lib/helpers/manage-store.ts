import Cookies from 'js-cookie';

export const getAccessToken = (): string | undefined => {
  return Cookies.get('access_token');
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get('refresh_token');
};

export const useStorage = () => {
  const setCookie = (token: string, value: any, options?: any) => {
    Cookies.set(token, value, options);
  };
  const setAccessToken = (value: any, options?: any) => {
    Cookies.set('access_token', value, options);
  };
  const setRefreshToken = (value: any, options?: any) => {
    Cookies.set('refresh_token', value, options);
  };
  const removeCookie = (token: string, options?: any) => {
    Cookies.remove(token, options);
  };
  const removeAccessToken = (options?: any) => {
    Cookies.remove('access_token', options);
  };
  const removeRefreshToken = (options?: any) => {
    Cookies.remove('refresh_token', options);
  };
  const getCookie = (token: string) => {
    Cookies.get(token);
  };

  return {
    setCookie,
    removeCookie,
    getCookie,
    getAccessToken,
    setRefreshToken,
    setAccessToken,
    removeRefreshToken,
    removeAccessToken,
  };
};
