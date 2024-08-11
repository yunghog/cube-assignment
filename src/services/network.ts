import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const DEFAULT_TIMEOUT = 30 * 1000;

const apiClient = axios.create({
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export class NetworkManager {
  static MyInstance: NetworkManager;
  static getInstance(): NetworkManager {
    if (!NetworkManager.MyInstance) {
      NetworkManager.MyInstance = new NetworkManager();
    }
    return NetworkManager.MyInstance;
  }
  apiClient = apiClient;
  appRequest = async (options: AxiosRequestConfig) => {
    return apiClient(options) as Promise<AxiosResponse>;
  };
}
