import React, { Component } from 'react';
import withRoot from './withRoot';
import Layout from './Layout';
import AuthContext from './helpers/AuthContext';
import { API } from './helpers/PetAlertAPI';

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

  clearAuthSessionState = () => {
    this.setAuthSessionState({
      isAuthenticated: false,
      username: null,
      displayName: null,
      roles: []
    })
  }

  getDisplayName = ({ username, firstName, secondName }) => {
    let displayName = `${firstName || ''} ${secondName || ''}`.trim();
    return displayName.length > 0 ? displayName : username;
  }

  login = (data) => {
    const { username, password } = data;

    return API.login({ username, password })
      .then(response => API.getUser())
      .then(response => {
        const { username, roles, firstName, secondName } = response.data.user;
        this.setAuthSessionState({
          isAuthenticated: true,
          username,
          roles,
          displayName: this.getDisplayName({ username, firstName, secondName }),
        });
      });
  }

  logout = () => {
    return API.logout().then(() => {
      this.clearAuthSessionState();
    });
  }

  register = (user) => API.signUp(user);

  hasRole = (role) => role in this.state.auth.roles;

  render() {
    const { login, register, logout, hasRole, updateDisplayName } = this;
    const { auth } = this.state;
    return (
      <AuthContext.Provider value={{ ...auth, login, logout, register, hasRole, updateDisplayName }}>
        <Layout />
      </AuthContext.Provider>
    );
  }
}

export default withRoot(App);
