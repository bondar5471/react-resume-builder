import { Gitlab } from '@gitbeaker/browser';
// import yaml from 'js-yaml';
// import { decode } from 'js-base64';

const api = new Gitlab({
  host: process.env.REACT_APP_GITLAB_URL,
  token: process.env.REACT_APP_GITLAB_TOKEN,
});

const id = process.env.REACT_APP_GITLAB_PROJ_ID;

export { api, id };
