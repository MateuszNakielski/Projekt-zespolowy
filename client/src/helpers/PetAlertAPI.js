import axios from 'axios'

export default class PetAlertAPI {
  constructor(apiRoot) {
    this.apiRoot = apiRoot;
  }

  login = ({ username, password }) => {
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);

    return axios.post(
      `${this.apiRoot}/login`,
      formData,
      { withCredentials: true }
    )
  }

  signup = ({ lastName, ...user }) => {
    return axios.post(
      `${this.apiRoot}/api/users/signup`,
      { user: { secondName: lastName, ...user } },
      {
        withCredentials: true
      }
    )
  }

  getProfile = () => {
    return axios.get(`${this.apiRoot}/api/users`, { withCredentials: true });
  }
}