import axios from 'axios';
import { RequestOptions } from '../react-app-env';

const request = (options: RequestOptions) => {
  const { headers, ...restOptions } = options;
  const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://ashrith-ea-backend.herokuapp.com',
    headers: {
      accept: 'application/json',
      ...headers
    }
  })
  return client(restOptions);
}

export default request;