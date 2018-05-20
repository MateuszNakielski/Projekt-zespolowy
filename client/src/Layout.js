import React, { Component } from 'react';
import DesktopAppBar from './components/DesktopAppBar';
import MobileSideBar from './components/MobileSideBar';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';

export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <DesktopAppBar />
        <MobileSideBar />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Register} />
        <Events />
      </React.Fragment>
    )
  }
}
