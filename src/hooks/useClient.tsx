import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
import { AxiosClient } from "@hmdlr/types";
import { Authphish, Scanphish } from "@hmdlr/utils";
import {
  DeployedPaths as d,
  Microservice,
} from "@hmdlr/utils/dist/Microservice";

const DeployedPaths = {
  [Microservice.Scanphish]: d[Microservice.Scanphish]
    .replace("http://", "https://")
    .replace(".localhost", ""),
  [Microservice.Authphish]: d[Microservice.Authphish]
    .replace("http://", "https://")
    .replace(".localhost", ""),
};

const defaultOptions: AxiosRequestConfig = {
  method: "GET",
  // @ts-ignore
  headers: {
    "Content-Type": "application/json",
  },
};

const clientContext = React.createContext<{
  client: AxiosClient;
  sdk: {
    scanphish: Scanphish;
    authphish: Authphish;
  };
}>({
  client: {
    get: (url: string, options?: any) =>
      axios.get(url, { ...defaultOptions, ...options }),
    post: (url: string, data: any, options?: any) =>
      axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url: string, data: any, options?: any) =>
      axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url: string, options?: any) =>
      axios.delete(url, { ...defaultOptions, ...options }),
  },
  sdk: {
    scanphish: undefined!,
    authphish: undefined!,
  },
});

export const ProvideClient = ({ children }: { children: any }) => {
  const client = useProvideClient();
  return (
    <clientContext.Provider value={client}>{children}</clientContext.Provider>
  );
};

export const useClient = () => {
  return React.useContext(clientContext);
};

function useProvideClient() {
  const scanphishAxios = axios.create({
    baseURL: DeployedPaths[Microservice.Scanphish],
    withCredentials: true,
  });

  const authphishAxios = axios.create({
    baseURL: DeployedPaths[Microservice.Authphish],
    withCredentials: true,
  });

  // use axiosCall
  const get = (url: string, options?: any) =>
    axios.get(url, { ...defaultOptions, ...options });
  const post = (url: string, data: any, options?: any) =>
    axios.post(url, data, { ...defaultOptions, ...options });
  const put = (url: string, data: any, options?: any) =>
    axios.put(url, data, { ...defaultOptions, ...options });
  const deleteRequest = (url: string, options?: any) =>
    axios.delete(url, { ...defaultOptions, ...options });

  const scanphish = new Scanphish({
    get: (url: string, options?: any) =>
      scanphishAxios
        .get(url, { ...defaultOptions, ...options })
        .then((res: AxiosResponse) => res.data),
    post: (url: string, data: any, options?: any) =>
      scanphishAxios
        .post(url, data, { ...defaultOptions, ...options })
        .then((res: AxiosResponse) => res.data),
    put: (url: string, data: any, options?: any) =>
      scanphishAxios
        .put(url, data, { ...defaultOptions, ...options })
        .then((res: AxiosResponse) => res.data),
    delete: (url: string, options?: any) =>
      scanphishAxios
        .delete(url, { ...defaultOptions, ...options })
        .then((res: AxiosResponse) => res.data),
  });

  const authphish = new Authphish({
    get: (url: string, options?: any) =>
      authphishAxios
        .get(url, { ...defaultOptions, ...options })
        .then((res: AxiosResponse) => res.data),
    post: (url: string, data: any, options?: any) =>
      authphishAxios
        .post(url, data, { ...defaultOptions, ...options })
        .then((res: AxiosResponse) => res.data),
    put: (url: string, data: any, options?: any) =>
      authphishAxios
        .put(url, data, { ...defaultOptions, ...options })
        .then((res: AxiosResponse) => res.data),
    delete: (url: string, options?: any) =>
      authphishAxios
        .delete(url, { ...defaultOptions, ...options })
        .then((res: AxiosResponse) => res.data),
  });

  return {
    client: {
      get,
      post,
      put,
      delete: deleteRequest,
    },
    sdk: {
      scanphish,
      authphish,
    },
  };
}

// TODO: hack for the moment, need to fix this 1
const scanphishAxios = axios.create({
  baseURL: DeployedPaths[Microservice.Scanphish],
  withCredentials: true,
});

export const scanphishApiClient = new Scanphish({
  get: (url: string, options?: any) =>
    scanphishAxios
      .get(url, { ...defaultOptions, ...options })
      .then((res: AxiosResponse) => res.data),
  post: (url: string, data: any, options?: any) =>
    scanphishAxios
      .post(url, data, { ...defaultOptions, ...options })
      .then((res: AxiosResponse) => res.data),
  put: (url: string, data: any, options?: any) =>
    scanphishAxios
      .put(url, data, { ...defaultOptions, ...options })
      .then((res: AxiosResponse) => res.data),
  delete: (url: string, options?: any) =>
    scanphishAxios
      .delete(url, { ...defaultOptions, ...options })
      .then((res: AxiosResponse) => res.data),
});

// TODO: hack for the moment, need to fix this 2

const authphishAxios = axios.create({
  baseURL: DeployedPaths[Microservice.Authphish],
  withCredentials: true,
});

export const authphishApiClient = new Authphish({
  get: (url: string, options?: any) =>
    authphishAxios
      .get(url, { ...defaultOptions, ...options })
      .then((res: AxiosResponse) => res.data),
  post: (url: string, data: any, options?: any) =>
    authphishAxios
      .post(url, data, { ...defaultOptions, ...options })
      .then((res: AxiosResponse) => res.data),
  put: (url: string, data: any, options?: any) =>
    authphishAxios
      .put(url, data, { ...defaultOptions, ...options })
      .then((res: AxiosResponse) => res.data),
  delete: (url: string, options?: any) =>
    authphishAxios
      .delete(url, { ...defaultOptions, ...options })
      .then((res: AxiosResponse) => res.data),
});
