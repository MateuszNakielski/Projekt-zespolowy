import React, { Component } from 'react';
import withRoot from './withRoot';
import Layout from './Layout';
import AuthContext from './helpers/AuthContext';
import PetAlertAPI from './helpers/PetAlertAPI';

export const API = new PetAlertAPI('http://localhost');

class App extends Component {

  getAuthSessionState = () => JSON.parse(sessionStorage.getItem('auth'));

  state = {
    auth: this.getAuthSessionState() || {
      isAuthenticated: false,
      username: null,
      displayName: null,
      roles: []
    }
  }

  setAuthSessionState = (auth) => {
    this.setState({ auth });
    sessionStorage.setItem('auth', JSON.stringify(auth));
  }

  getDisplayName = ({ username, firstName, secondName }) => {
    let displayName = `${firstName || ''} ${secondName || ''}`.trim();
    return displayName.length > 0 ? displayName : username;
  }

  login = (data) => {
    console.log(data);
    const { username, password } = data;

    return API.login({ username, password })
      .then(response => { console.log(response); return API.getProfile() })
      .then(response => {
        console.log(response);
        const { username, roles, firstName, secondName } = response.data.user;
        this.setAuthSessionState({
          isAuthenticated: true,
          username,
          roles,
          displayName: this.getDisplayName({ username, firstName, secondName }),
        });
      });
  }

  register = (user) => API.signup(user);

  render() {
    const { login, register } = this;
    const { auth } = this.state;
    return (
      <AuthContext.Provider value={{ ...auth, login, register }}>
        <Layout />
      </AuthContext.Provider>
    );
  }
}

export default withRoot(App);
