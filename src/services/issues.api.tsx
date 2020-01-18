import request from '../utils/request';
import { API_ISSUES } from '../routes/api';
import { RequestOptions } from '../react-app-env';

type Options = Omit<RequestOptions, 'url'>;

class IssuesAPI {
  static fetch(options: Options) {
    return request({url: API_ISSUES, ...options})
  }
}

export default IssuesAPI;