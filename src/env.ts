import { Microservice, LocalPaths, DeployedPaths } from '@hmdlr/utils/dist/Microservice';

export default {
  api: {
    [Microservice.Authphish]: process.env.REACT_APP_NODE_ENV === 'development'
        ? `${LocalPaths[Microservice.Authphish]}`
        : `${DeployedPaths[Microservice.Authphish]}`,
    [Microservice.Scanphish]: process.env.REACT_APP_NODE_ENV === 'development'
        ? `${LocalPaths[Microservice.Scanphish]}`
        : `${DeployedPaths[Microservice.Scanphish]}`,
  },
  tokenLocation: 'starphish-token',
  chromeStoreUrl: 'https://chrome.google.com/webstore/detail/heimdallr/mgcclljnboinjppelonolbhklnnljonp'
};
