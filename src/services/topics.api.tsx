import request from '../utils/request';
import { API_TOPICS } from '../routes/api';
import { RequestOptions } from '../react-app-env';

type Options = Omit<RequestOptions, 'url'>;

class TopicsAPI {
  static fetch(options: Options) {
    return request({url: API_TOPICS, ...options})
  }
}

export default TopicsAPI;