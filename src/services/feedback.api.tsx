import request from '../utils/request';
import { API_FEEDBACK } from '../routes/api';
import { RequestOptions } from '../react-app-env';

type Options = Omit<RequestOptions, 'url'>;

class FeedbackAPI {
  static submitForm(options: Options) {
    return request({url: API_FEEDBACK, ...options, method: 'post'})
  }
}

export default FeedbackAPI;