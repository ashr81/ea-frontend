/**
 * API service file where services specific to platforms are hosted.
 */
import request from '../utils/request';
import { API_PLATFORMS } from '../routes/api';
import { RequestOptions } from '../react-app-env';

type Options = Omit<RequestOptions, 'url'>;

class PlatformsAPI {
  static fetch(options: Options) {
    return request({url: API_PLATFORMS, ...options})
  }
}

export default PlatformsAPI;