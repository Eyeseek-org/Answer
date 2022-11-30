import axios from 'axios';

export const DapAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DAPP,
  headers: {
    'X-Parse-Application-Id': `${process.env.NEXT_PUBLIC_DAPP_ID}`,
    'Content-Type': 'application/json',
    'x-Parse-Master-Key': `${process.env.NEXT_PUBLIC_MORALIS}`,
  },
});

export const ParseAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PARSE,
  headers: {
    'x-parse-application-id': `${process.env.NEXT_PUBLIC_DAPP_ID}`,
    'content-type': 'application/json',
    'x-parse-master-key': `${process.env.NEXT_PUBLIC_MORALIS}`,
  },
});
