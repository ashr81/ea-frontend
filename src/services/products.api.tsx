import request from '../utils/request';
import { API_PRODUCTS } from '../routes/api';
import { RequestOptions } from '../react-app-env';

type Options = Omit<RequestOptions, 'url'>;

class ProductsAPI {
  static fetch(options: Options) {
    return request({url: API_PRODUCTS, ...options})
  }
}

export default ProductsAPI;