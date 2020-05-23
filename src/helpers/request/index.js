import axios from 'axios';
import { MNIST_DATA_URL } from 'constants/api';

/**
 * Create a new instance of axios with a custom config
 */
const request = axios.create({
  baseURL: MNIST_DATA_URL,
});

/**
 * Errors interceptor
 * If error - Returns error with status text
 * @param error
 */
const errorHandlerInterceptor = (error) => {
  if ([400, 404, 500].includes(error.response.status)) {
    throw Error(error.response.statusText);
  }
};

request.interceptors.response.use(null, (error) =>
  errorHandlerInterceptor(error)
);

export default request;
