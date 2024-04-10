import axios from 'utils/axios';

export async function login(data) {
  return handleResponse(function (data) {
    return axios.post('/auth/login', data);
  }, data);
}

export async function user() {
  return handleResponse(function () {
    return axios.get('/v1/user');
  });
}

var handleResponse = async function (func, data, params = {}) {
  try {
    let result = await func(data, params);
    if (result && result.code === 0) {
      return result.data;
    }
  } catch (err) {
    if (err.response) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};
