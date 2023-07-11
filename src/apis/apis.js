import instance from './axios';

const responseBody = (response) => response.data;
const errorBody = (error) => error.response.data;
const request = {
  get: (url, headers = {}) =>
    instance
      .get(url, { ...headers })
      .then(responseBody)
      .catch(errorBody),
  post: (url, body, headers = {}) =>
    instance.post(url, body, headers).then(responseBody).catch(errorBody),
  delete: (url, body, headers = {}) =>
    instance
      .delete(url, { data: body, ...headers })
      .then(responseBody)
      .catch(errorBody),
};
const UserApis = {
  getUsers: (params = {}) => request.get('/users', {}),
  addUser: (params) => request.post('/users', params),
  deleteUser: (params) => request.delete(`/users/${params.id}`),
  uploadImg: (params) =>
    request.post('/users/upload', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

export { UserApis };
