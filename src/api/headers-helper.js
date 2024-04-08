import axios from 'axios';

export function setAcceptLanguageHeader(value) {
  axios.defaults.headers.common['Accept-Language'] = value;
}

export function setTokenHeader(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
