import fetch, { type RequestInit as FetchRequestInit } from 'node-fetch';
import { HttpProxyAgent } from 'http-proxy-agent';
import { PROXY_URL } from '$env/static/private';

interface CustomRequestInit extends FetchRequestInit {
  agent?: HttpProxyAgent<string>;
}

export const fetchProxy = async (url: string, options: CustomRequestInit = {}) => {
  if (PROXY_URL) {
    options.agent = new HttpProxyAgent(PROXY_URL);
  }

  return fetch(url, options);
};