const api = process.env.REACT_APP_API;
const stage = process.env.REACT_APP_STAGE;

export const endpoints = {
  users: () => `${api}/${stage}/users`,
  roles: () => `${api}/${stage}/roles`,
  policies: () => `${api}/${stage}/policies`,
  auth: () => `${api}/${stage}/auth`
};