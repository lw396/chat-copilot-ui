import axios from 'axios';
import envconfig from 'envconfig/envconfig';

async function _get(url, param) {
  const response = await axios.get(envconfig.baseURL + url, param);
  return response.data;
}

async function _post(url, data) {
  const response = await axios.post(envconfig.baseURL + url, data);
  return response.data;
}

export default {
  get: _get,
  post: _post
};
