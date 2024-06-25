import axios, { AxiosRequestConfig } from "axios";

const AXIOS_TIMEOUT = 3000;
const RETRY_TIMEOUT = 500;
const RETRY_MAX_COUNT = 3;
let RETRY_COUNT = 0;

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com/",
  timeout: AXIOS_TIMEOUT,
  headers: {
    "Content-Type": "application.json",
  },
});

axiosInstance.interceptors.request.use(
  (req) => {
    if (req.data instanceof FormData) {
      req.headers["Content-Type"] = "multipart/form-data";
    }
    return req;
  },
  (err: Error | null) => {
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err: Error | null) => {
    return Promise.reject(err);
  },
);

export const get = async (url: string, config?: AxiosRequestConfig) => {
  return await axiosInstance.get(url, config);
};

export const post = async (
  url: string,
  data: any,
  config?: AxiosRequestConfig,
) => {
  return await axiosInstance.post(url, data, config);
};

export const patch = async (
  url: string,
  data: Request,
  config: AxiosRequestConfig,
) => {
  return await axiosInstance.patch(url, data, config);
};

export const del = async (url: string, config?: AxiosRequestConfig) => {
  return await axiosInstance.delete(url, config);
};

const backoffRequest = async (times: number, config: AxiosRequestConfig) => {
  setTimeout(async () => {
    axiosInstance.request(config);
  }, times);
};
