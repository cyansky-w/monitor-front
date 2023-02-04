
//引入axios拦截器
import axios from "@/service/interceptors";

const ApiService = {

  //创建不同的网络请求方法
  get(resource, params, slug = "",headers) {
    return axios
    .get(`${resource}${slug ? `/${slug}` : ''}`, { params,headers})
    .catch(error => {
      throw error.response;
    });
  },

  post(resource, params, headers) {
    return axios
    .post(`${resource}`, params, {headers})
    .catch(error => {
      throw error.response;
    });
  },

  patch(resource, params, slug = "",headers) {
    return axios
    .patch(`${resource}/${slug}`, params,{headers})
    .catch(error => {
      throw error.response;
    });
  },

  put(resource, params, slug = "",headers) {
    return axios
    .put(`${resource}/${slug}`, params,{headers})
    .catch(error => {
      throw error.response;
    });
  },

  delete(resource, params, slug = "",headers) {
    return axios
      .delete(`${resource}/${slug}`, { params ,headers})
      .catch(error => {
        throw error.response;
      });
  }
};


export default ApiService;