import axios from "axios";
import useStore from "../store";
import { getAccessToken } from "./clientFunctions";

const protectedAxiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

protectedAxiosClient.interceptors.request.use(
  async (config) => {
    const { accessToken, setAccessToken } = useStore.getState();

    if (!accessToken) {
      const newAccessToken = await getAccessToken();

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return config;
      }
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

protectedAxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      const newAccessToken = await getAccessToken();

      if (newAccessToken) {
        useStore.getState().setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default protectedAxiosClient;
