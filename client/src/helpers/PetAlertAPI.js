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

  logout = () => {
    return axios.get(
      `${this.apiRoot}/logout`,
      { withCredentials: true, maxRedirects: 0 }
    ).catch((err) => { return true; })
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

  addEvent = ({ event }) => {
    console.log(JSON.stringify(event).length);
    return axios.post(
      `${this.apiRoot}/api/event`,
      { event },
      { withCredentials: true }
    )
  }

  getEvent = ({ id }) => {
    return axios.get(
      `${this.apiRoot}/api/event/${id}`,
      { withCredentials: true }
    )
  }

  observeEvent = ({ id }) => {
    return axios.post(
      `${this.apiRoot}/api/event/${id}/followers`,
      null,
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

export const API = new PetAlertAPI('http://localhost');