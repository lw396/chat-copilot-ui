/**
 * 全局配置文件
 */
let baseURL;
let imgUrl = 'http://localhost:6978/img/';
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:6978';
} else {
  baseURL = 'http://localhost:6978';
}

export default { imgUrl, baseURL };
