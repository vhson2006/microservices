import { callJsonApi, callPrivateJsonApi } from "./fetch";

//auth
export const login = async (params: any) => {
  return await callJsonApi("PUT", "/api/auth", params);
};

export const register = async (params: any) => {
  return await callJsonApi("POST", "/api/auth", params);
};

export const logout = async () => {
  return await callJsonApi("DELETE", "/api/auth", {});
};

export const requestRecoveryEmail = async (params: any) => {
  return await callJsonApi("PATCH", "/api/forgot-password", params);
};

export const getResetToken = async (params: any) => {
  return await callJsonApi("DELETE", "/api/forgot-password", params);
};

export const resetPassword = async (params: any) => {
  return await callJsonApi("PUT", "/api/forgot-password", params);
};

//news
export const getNewsList = async (queryParams: any) => {
  return await callJsonApi("GET", "/api/news", queryParams);
};

export const getBlog = async (id: any) => {
  return await callJsonApi("GET", `/api/news/${id}`, {});
};

//user-product/shop
export const getProductList = async (queryParams: any) => {
  return await callJsonApi("GET", "/api/user-product/shop", queryParams);
};

export const getProduct = async (id: any) => {
  return await callJsonApi("GET", `/api/product/${id}`, {});
};

//dashboard
export const getPackageList = async (queryParams: any) => {
  return await callPrivateJsonApi("GET", "/api/package", queryParams);
};

export const getPackage = async (id: any) => {
  return await callJsonApi("GET", `/api/package/${id}`, {});
};

export const getOwnProductList = async (queryParams: any) => {
  return await callPrivateJsonApi("GET", "/api/user-product", queryParams);
};

export const addOwnProduct = async (params: any) => {
  return await callPrivateJsonApi("POST", "/api/user-product", params);
};

export const deleteOwnProduct = async (id: string) => {
  return await callPrivateJsonApi("DELETE", `/api/user-product/${id}`, {});
};

export const editOwnProduct = async (id: string, params: any) => {
  return await callPrivateJsonApi("PUT", `/api/user-product/${id}`, params);
};

export const getCardList = async (queryParams: any) => {
  return await callPrivateJsonApi("GET", "/api/card", queryParams);
};

//profile
export const getUserInfo = async () => {
  return await callPrivateJsonApi("GET", `/api/profile`, {});
};

export const updateUserInfo = async (data: any) => {
  return await callPrivateJsonApi("PUT", `/api/profile`, data);
};

//cart
export const geCartInfo = async (data: any) => {
  return await callJsonApi("GET", `/api/user-product/cart`, data);
};

export const createOrder = async (data: any) => {
  return await callJsonApi("POST", `/api/order`, data);
};

//package
export const removePackage = async (id: string) => {
  return await callPrivateJsonApi("DELETE", `/api/package/${id}`, {});
};

export const donePackage = async (id: any) => {
  return await callPrivateJsonApi("PUT", `/api/package/${id}`, {});
};
