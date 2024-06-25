import axios, {
  AxiosRequestConfig,
  HttpStatusCode,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

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
  (err: Error) => {
    if (isAxiosError(err)) {
      if (err.status === HttpStatusCode.NotFound) {
        console.log(
          `CANNOT FOUND END POINT <REQ> :: ${err.config?.baseURL} ${err.config?.url}`,
        );
      } else if (err.status === HttpStatusCode.BadRequest) {
        console.log(`BAD REQUEST <REQ> :: ${err.config?.data}`);
      } else {
        throw err;
      }
    }
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  (res) => {
    RETRY_COUNT = 3;
    return res;
  },
  (err: Error | null) => {
    if (isAxiosError(err)) {
      switch (err.response?.status) {
        case HttpStatusCode.NotFound:
          console.log(
            `CANNOT FOUND END POINT <RES> :: ${err.config?.baseURL} ${err.config?.url}`,
          );
          break;
        case HttpStatusCode.BadRequest:
          console.log(`BAD REQUEST <RES> :: ${err.config?.data}`);
          break;
        case HttpStatusCode.Unauthorized:
          console.log(`Unauthroized <RES> :: ${err.config?.headers}`);
          break;
        case HttpStatusCode.Forbidden:
          console.log(`Forbidden <RES> :: ${err.config?.headers}`);
          break;
        case HttpStatusCode.BadGateway:
          while (RETRY_COUNT++ < RETRY_MAX_COUNT) {
            backoffRequest(
              RETRY_COUNT * RETRY_TIMEOUT,
              err.config as InternalAxiosRequestConfig,
            );
          }
          break;
        default:
          console.log(`Axios Error <RES> :: ${err.status} ${err.message}`);
          break;
      }
    } else {
      throw err;
    }
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
