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

  /*
  fbLogin = () => {
    throw NotImplemented
  } */

  logout = () => {
    return axios.get(
      `${this.apiRoot}/logout`,
      { withCredentials: true }
    );
  }

  changePassword = ({ newPassword }) => {
    return axios.put(
      `${this.apiRoot}/api/users/password`,
      { newPassword },
      { withCredentials: true }
    );
  }

  signUp = ({ lastName, ...user }) => {
    return axios.post(
      `${this.apiRoot}/api/users/signup`,
      { user: { secondName: lastName, ...user } },
      { withCredentials: true }
    );
  }

  getUser = () => {
    return axios.get(
      `${this.apiRoot}/api/users`,
      { withCredentials: true }
    );
  }

  getAllUsers = () => {
    return axios.get(
      `${this.apiRoot}/api/users/admin`,
      { withCredentials: true }
    );
  }

  getAllEvents = () => {
    return axios.get(
      `${this.apiRoot}/api/event`,
      { withCredentials: true }
    )
  }

  addComment = ({ eventId, comment }) => {
    return axios.post(
      `${this.apiRoot}/api/event/comments`,
      {
        event: {
          id: eventId
        },
        comment: {
          comment
        }
      },
      { withCredentials: true }
    );
  }

  followEvent = ({ eventId }) => {
    return axios.post(
      `${this.apiRoot}/api/event/followers`,
      {
        event: {
          id: eventId
        }
      },
      { withCredentials: true }
    );
  }
}