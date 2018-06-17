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

  updateUser = ({ firstName, lastName, phone }) => {
    const user = { secondName: lastName, phoneNumber: phone, firstName };

    return axios.post(
      `${this.apiRoot}/api/users`,
      { user },
      { withCredentials: true }
    ).then((data) => {
      var authData = JSON.parse(sessionStorage.getItem('auth'));
      authData.displayName = `${firstName || ''} ${lastName || ''}`.trim();
      sessionStorage.setItem('auth', JSON.stringify(authData));
      window.location = window.location;
      return data;
    });
  }

  toggleActivation = ({ id, activate }) => {
    const status = activate ? 3 : 1;

    return axios.patch(
      `${this.apiRoot}/api/users/${id}`,
      { user: { status } },
      { withCredentials: true }
    )
  }

  toggleAdmin = ({ id, admin }) => {
    const role = admin ? "ADMIN" : "STANDARD_USER";
    return axios.patch(
      `${this.apiRoot}/api/users/${id}`,
      { user: { roles: [role] } },
      { withCredentials: true }
    )
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

  removeEvent = ({ id }) => {
    return axios.post(
      `${this.apiRoot}/api/event/${id}/delete`,
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