import request from './request';

export async function login(data) {
  return handleResponse(function (data) {
    return request.post('/auth/login', data);
  }, data);
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
